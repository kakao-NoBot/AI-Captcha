-- ============================================================
-- 01_schema.sql  ·  CAPTCHA SaaS · MySQL 8.0
-- /docker-entrypoint-initdb.d 에 마운트되어 볼륨 최초 초기화 시 1회 자동 실행
-- ============================================================

CREATE DATABASE IF NOT EXISTS captcha
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE captcha;

-- ============================================================
-- 1. plans (요금제)
--    users가 FK로 참조하므로 먼저 생성
-- ============================================================
CREATE TABLE plans (
    plan_id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    plan_name     VARCHAR(50)    NOT NULL,
    monthly_price DECIMAL(10,2)  NOT NULL,
    api_limit     INT UNSIGNED   NOT NULL COMMENT '월 API 호출 한도',
    captcha_limit INT UNSIGNED   NOT NULL COMMENT '월 캡차 발급 한도',
    PRIMARY KEY (plan_id),
    UNIQUE KEY uq_plans_plan_name (plan_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. users (회원/고객사)
-- ============================================================
CREATE TABLE users (
    user_id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    login_id          VARCHAR(50)     NOT NULL,
    password_hash     VARCHAR(255)    NOT NULL,       -- bcrypt
    email             VARCHAR(255)    NOT NULL,
    phone             VARCHAR(20)     NULL,
    role              ENUM('user','admin') NOT NULL DEFAULT 'user',
    plan_id           BIGINT UNSIGNED NULL            COMMENT '미가입 시 NULL',
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subscription_date DATETIME NULL                   COMMENT '요금제 가입일; 미가입 시 NULL',
    PRIMARY KEY (user_id),
    UNIQUE KEY uq_users_login_id (login_id),
    UNIQUE KEY uq_users_email    (email),
    KEY idx_users_plan_id (plan_id),
    CONSTRAINT fk_users_plan_id
        FOREIGN KEY (plan_id) REFERENCES plans (plan_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. payments (결제 내역)
-- ============================================================
CREATE TABLE payments (
    payment_id     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id        BIGINT UNSIGNED NOT NULL,
    plan_id        BIGINT UNSIGNED NOT NULL,
    amount         DECIMAL(10,2)   NOT NULL,
    pg_provider    ENUM('toss','kakao') NOT NULL,
    pg_provider_id VARCHAR(100)    NOT NULL COMMENT 'PG사 고유 거래 ID',
    pg_payment_key VARCHAR(255)    NOT NULL COMMENT 'PG사 결제 승인 키',
    payment_status ENUM('pending','paid','cancelled','failed') NOT NULL DEFAULT 'pending',
    paid_at        DATETIME NULL,
    cancelled_at   DATETIME NULL,
    PRIMARY KEY (payment_id),
    KEY idx_payments_user_id        (user_id),
    KEY idx_payments_payment_status (payment_status),
    CONSTRAINT fk_payments_user_id
        FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_payments_plan_id
        FOREIGN KEY (plan_id) REFERENCES plans (plan_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. api_keys (API 키)
--    소프트 삭제 정책: 물리 삭제 없이 is_active=0 또는 expired_at으로 만료 처리
--    검증 로그 역추적을 위해 행은 항상 보존
-- ============================================================
CREATE TABLE api_keys (
    api_key_id   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    api_key_hash VARCHAR(255)    NOT NULL COMMENT 'SHA-256 해시; 원문은 저장 안 함',
    user_id      BIGINT UNSIGNED NOT NULL,
    plan_id      BIGINT UNSIGNED NOT NULL,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expired_at   DATETIME NULL            COMMENT 'NULL = 만료일 없음',
    is_active    TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (api_key_id),
    UNIQUE KEY uq_api_keys_hash (api_key_hash),
    KEY idx_api_keys_user_id (user_id),
    CONSTRAINT fk_api_keys_user_id
        FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_api_keys_plan_id
        FOREIGN KEY (plan_id) REFERENCES plans (plan_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. boards (게시판)
-- ============================================================
CREATE TABLE boards (
    board_id   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id    BIGINT UNSIGNED NOT NULL,
    board_type ENUM('공지사항','Q&A') NOT NULL,
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (board_id),
    KEY idx_boards_user_id    (user_id),
    KEY idx_boards_board_type (board_type),
    CONSTRAINT fk_boards_user_id
        FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. answers (Q&A 답변)
--    board_id ON DELETE CASCADE: 게시글 삭제 시 답변도 함께 삭제
-- ============================================================
CREATE TABLE answers (
    answer_id      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    board_id       BIGINT UNSIGNED NOT NULL,
    admin_id       BIGINT UNSIGNED NOT NULL COMMENT 'users(role=admin) 참조',
    answer_content TEXT NOT NULL,
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (answer_id),
    KEY idx_answers_board_id (board_id),
    KEY idx_answers_admin_id (admin_id),
    CONSTRAINT fk_answers_board_id
        FOREIGN KEY (board_id) REFERENCES boards (board_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answers_admin_id
        FOREIGN KEY (admin_id) REFERENCES users (user_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. captcha_images (캡차 이미지 원본)
--    instruction: role='question'일 때만 의미있음
--    CHECK 제약으로 role='option' 행에 instruction이 들어오는 걸 DB 레벨에서 차단
-- ============================================================
CREATE TABLE captcha_images (
    image_id    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    role        ENUM('question','option') NOT NULL,
    render_type ENUM('ascii_art','real_photo') NOT NULL,
    filename    VARCHAR(255) NOT NULL,
    label       VARCHAR(100) NOT NULL COMMENT '이미지가 나타내는 객체 레이블 (apple, banana …)',
    instruction VARCHAR(500) NULL     COMMENT 'role=question 전용 안내 문구; option이면 반드시 NULL',
    PRIMARY KEY (image_id),
    KEY idx_captcha_images_role (role),
    CONSTRAINT chk_captcha_images_instruction
        CHECK (role = 'question' OR instruction IS NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. captchas (캡차 문제 세트)
--    choice_labels: type2_identify(4지선다) 전용 텍스트 선택지
--      형식 → JSON 배열: ["사과","바나나","가방","컵"]
--    CHECK 제약으로 type1_drag 행의 choice_labels를 NULL로 강제
-- ============================================================
CREATE TABLE captchas (
    captcha_id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    captcha_type      ENUM('type1_drag','type2_identify') NOT NULL,
    question_image_id BIGINT UNSIGNED NOT NULL,
    target_label      VARCHAR(100) NOT NULL COMMENT '정답 레이블 (apple, target_zone …)',
    choice_labels     JSON NULL     COMMENT 'type2_identify 전용; 단순 문자열 배열 ["사과","바나나",…]',
    PRIMARY KEY (captcha_id),
    KEY idx_captchas_question_image_id (question_image_id),
    KEY idx_captchas_captcha_type      (captcha_type),
    CONSTRAINT fk_captchas_question_image_id
        FOREIGN KEY (question_image_id) REFERENCES captcha_images (image_id)
        ON DELETE RESTRICT,
    CONSTRAINT chk_captchas_choice_labels
        CHECK (captcha_type = 'type2_identify' OR choice_labels IS NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. captcha_options (캡차 선택지 이미지 매핑)
--    복합 PK (captcha_id, image_id)
--    captcha_id ON DELETE CASCADE: 문제 삭제 시 선택지도 함께 삭제
-- ============================================================
CREATE TABLE captcha_options (
    captcha_id BIGINT UNSIGNED  NOT NULL,
    image_id   BIGINT UNSIGNED  NOT NULL,
    position   TINYINT UNSIGNED NOT NULL COMMENT '보기 순서 (1~4)',
    is_correct TINYINT(1)       NOT NULL DEFAULT 0,
    PRIMARY KEY (captcha_id, image_id),
    KEY idx_captcha_options_image_id (image_id),
    CONSTRAINT fk_captcha_options_captcha_id
        FOREIGN KEY (captcha_id) REFERENCES captchas (captcha_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_captcha_options_image_id
        FOREIGN KEY (image_id) REFERENCES captcha_images (image_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. captcha_verifications (검증/로그)
--     user_id 미보관 — api_key_id → api_keys.user_id 조인으로 역추적 (의도된 정규화)
--     drag_trace JSON 구조 (확정 전 MVP 형태, 필드 추가 시 스키마 변경 불필요):
--       [ {"x": 120, "y": 340, "t": 0}, {"x": 125, "y": 342, "t": 16}, … ]
--       x, y: 픽셀 좌표 / t: 드래그 시작 기준 경과 ms
--       향후 필드 추가 예시: "pressure", "event_type"("mousedown"|"mousemove"|"mouseup")
-- ============================================================
CREATE TABLE captcha_verifications (
    verification_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    captcha_id      BIGINT UNSIGNED NOT NULL,
    api_key_id      BIGINT UNSIGNED NOT NULL,
    selected_label  VARCHAR(100) NULL COMMENT 'type2_identify 전용: 사용자가 선택한 레이블',
    is_correct      TINYINT(1)   NULL COMMENT 'NULL = 미채점',
    drag_trace      JSON         NULL COMMENT 'type1_drag 전용: [{x,y,t}, …]',
    is_bot          TINYINT(1)   NULL COMMENT 'NULL = 행동 분류기 미실행',
    one_time_token  VARCHAR(255) NULL COMMENT '통과 시 발급; 미통과 시 NULL',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (verification_id),
    UNIQUE KEY uq_verifications_one_time_token (one_time_token),
    KEY idx_verifications_api_key_id (api_key_id),
    KEY idx_verifications_captcha_id (captcha_id),
    KEY idx_verifications_created_at (created_at),
    CONSTRAINT fk_verifications_captcha_id
        FOREIGN KEY (captcha_id) REFERENCES captchas (captcha_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_verifications_api_key_id
        FOREIGN KEY (api_key_id) REFERENCES api_keys (api_key_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
