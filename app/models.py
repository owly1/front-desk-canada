from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class Inquiry(StrictModel):
    conversation_id: str = Field(min_length=1, max_length=150)
    name: str = Field(min_length=1, max_length=100)
    phone: str = Field(pattern=r"^\+[1-9]\d{7,14}$")
    city: Literal["Waterloo", "Kitchener", "Cambridge", "Guelph"]
    address: str = Field(default="", max_length=250)
    job_type: Literal["water_heater", "drain_clog", "leak_repair", "toilet_faucet", "maintenance_tuneup", "renovation", "other", "emergency"]
    language: str = Field(default="en", min_length=2, max_length=12)
    summary: str = Field(min_length=1, max_length=1200, description="Owner-facing English summary, not independently translation-verified")
    urgency: Literal["routine", "urgent", "emergency"] = "routine"
    consent_to_store: bool = False
    sms_consent: bool = False
    source: Literal["manual", "elevenlabs", "simulation"] = "elevenlabs"


class QuoteRequest(StrictModel):
    job_type: str = Field(min_length=1, max_length=60)


class BudgetRequest(StrictModel):
    lead_id: str
    range_accepted: bool


class BookingRequest(StrictModel):
    lead_id: str
    slot_id: str
    confirmed_by_caller: bool = False


class LeadRequest(StrictModel):
    lead_id: str


class EmergencyRequest(StrictModel):
    lead_id: str
    description: str = Field(min_length=1, max_length=1200)


class SmsRequest(StrictModel):
    booking_id: str


class SessionRequest(StrictModel):
    token: str = Field(min_length=1, max_length=500)


class DemoRequest(StrictModel):
    scenario: Literal["en", "fr", "zh", "emergency", "renovation"]
