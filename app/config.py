import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass
class Settings:
    db_path: str = "data/frontdesk.sqlite3"
    admin_token: str = ""
    agent_secret: str = ""
    agent_id: str = ""
    webhook_secret: str = ""
    twilio_sid: str = ""
    twilio_token: str = ""
    twilio_from: str = ""
    live_sms: bool = False
    sms_allowlist: tuple[str, ...] = ()
    languages: tuple[str, ...] = ("en", "fr", "zh")
    demo: bool = True

    @classmethod
    def from_env(cls):
        load_dotenv()
        return cls(
            db_path=os.getenv("DB_PATH", cls.db_path),
            admin_token=os.getenv("ADMIN_TOKEN", ""),
            agent_secret=os.getenv("AGENT_SECRET", ""),
            agent_id=os.getenv("ELEVENLABS_AGENT_ID", ""),
            webhook_secret=os.getenv("ELEVENLABS_WEBHOOK_SECRET", ""),
            twilio_sid=os.getenv("TWILIO_ACCOUNT_SID", ""),
            twilio_token=os.getenv("TWILIO_AUTH_TOKEN", ""),
            twilio_from=os.getenv("TWILIO_FROM_NUMBER", ""),
            live_sms=os.getenv("ENABLE_LIVE_SMS", "false").lower() == "true",
            sms_allowlist=tuple(x.strip() for x in os.getenv("SMS_ALLOWLIST", "").split(",") if x.strip()),
            languages=tuple(x.strip() for x in os.getenv("SUPPORTED_LANGUAGES", "en,fr,zh").split(",") if x.strip()),
            demo=os.getenv("DEMO_MODE", "true").lower() == "true",
        )
