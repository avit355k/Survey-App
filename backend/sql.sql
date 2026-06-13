-- ==========================================
-- PROFILES
-- ==========================================

CREATE TABLE IF NOT EXISTS profiles (
id UUID PRIMARY KEY,
name TEXT NOT NULL,
role TEXT NOT NULL DEFAULT 'user'
CHECK (role IN ('user','admin')),
created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- CANDIDATES
-- ==========================================

CREATE TABLE IF NOT EXISTS candidates (
id BIGSERIAL PRIMARY KEY,
name TEXT NOT NULL,
image_url TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- CATEGORIES
-- ==========================================

CREATE TABLE IF NOT EXISTS categories (
id BIGSERIAL PRIMARY KEY,
name TEXT UNIQUE NOT NULL,
max_marks INTEGER DEFAULT 10,
created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- SURVEY SUBMISSIONS
-- One User = One Survey
-- ==========================================

CREATE TABLE IF NOT EXISTS survey_submissions (
id BIGSERIAL PRIMARY KEY,
user_id UUID NOT NULL,
submitted_at TIMESTAMP DEFAULT NOW(),

```
CONSTRAINT unique_user_submission
UNIQUE(user_id)
```

);

-- ==========================================
-- SURVEY MARKS
-- ==========================================

CREATE TABLE IF NOT EXISTS survey_marks (
id BIGSERIAL PRIMARY KEY,

```
submission_id BIGINT NOT NULL,
candidate_id BIGINT NOT NULL,
category_id BIGINT NOT NULL,

marks NUMERIC(4,2) NOT NULL
CHECK (marks >= 0 AND marks <= 10),

created_at TIMESTAMP DEFAULT NOW(),

CONSTRAINT fk_submission
FOREIGN KEY(submission_id)
REFERENCES survey_submissions(id)
ON DELETE CASCADE,

CONSTRAINT fk_candidate
FOREIGN KEY(candidate_id)
REFERENCES candidates(id)
ON DELETE CASCADE,

CONSTRAINT fk_category
FOREIGN KEY(category_id)
REFERENCES categories(id)
ON DELETE CASCADE
```

);
