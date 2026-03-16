# ProdPad Integration

Langdock Plugin für vollständigen ProdPad-Zugriff: Ideas, Feedback, Roadmaps, Objectives, Companies, Contacts.

## Was es kann (43 Actions)

**Ideas & Feedback**
- `create_idea`, `get_idea`, `list_ideas`, `update_idea`, `update_idea_status`
- `add_idea_vote`, `get_idea_votes`, `get_idea_comments`, `get_idea_feedback`, `get_idea_related_ideas`, `get_idea_userstories`
- `create_feedback`, `get_feedback`, `list_feedbacks`, `update_feedback`, `get_feedback_ideas`

**Roadmaps**
- `get_roadmap`, `list_roadmaps`, `get_product_roadmap`
- `create_roadmap_card`, `get_roadmap_card`, `update_roadmap_card`

**Objectives & OKRs**
- `create_objective`, `get_objective`, `list_objectives`, `update_objective`

**Companies & Contacts**
- `create_company`, `get_company`, `list_companies`, `update_company`
- `create_contact`, `get_contact`, `list_contacts`, `update_contact`

**Sonstiges**
- `get_product`, `list_products`, `get_persona`, `list_personas`
- `list_jobroles`, `list_statuses`, `list_tags`, `list_users`
- `search`

## Setup

**Auth:** ProdPad API Key
→ ProdPad → Account Settings → API Keys

## Dateistruktur

```
prodpad-integration/
├── manifest.json
├── authTest.js
└── actions/          # 43 Action-Dateien
```
