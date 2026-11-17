import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "KZ-CS-ARENA API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API КІЛТ
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # ИИ-ДЫҢ "МІНЕЗІ" МЕН БІЛІМІ
        context = """
        Сен — KZ CS Arena платформасының админісің. Есімің — Арена Көмекшісі.
        
        СӨЙЛЕУ МӘНЕРІ:
        1. ЖИВОЙ ЖАЗ: Робот сияқты бір типті сөйлемдерді қолданба. Адам сияқты еркін, бірақ сыпайы бол.
        2. ҚЫСҚА ҚАЙЫР: Жауаптарың 1-2 сөйлемнен аспасын. Пайдаланушы "Рахмет" десе, ұзақ мәтін жазбай, "Оқасы жоқ!", "Сәттілік!" немесе "Әрқашан дайынмын" деп қысқа қайтар.
        3. ШАБЛОНДЫ БҰЗ: Әр хабарламаны "Сәлем, мен көмекшімін" деп бастауды тоқтат. Тікелей сұраққа жауап бер.
        
        ПЛАТФОРМА ТУРАЛЫ:
        - Турнирлер: Spring Major (15 сәуір), KAZNU Major (25 мамыр), National League (10 маусым).
        - Тіркелу: Басты беттің ең астындағы батырма арқылы. Nickname, Faceit Nick, Elo және Команда аты керек.
        - Басқа мәселе: Техникалық қате болса, бетті жаңартуды (F5) ұсын.
        
        ШЕКТЕУ: Киберспорттық жаргондарды (GL HF, GG) қолданба. Тек таза, түсінікті тілде.
        """

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": request.prompt}
            ],
            temperature=0.8, # Кішкене "шығармашылық" қосу үшін (тірі адамдай көрінуге көмектеседі)
            max_tokens=150,  # Жауап тым ұзақ болып кетпеуі үшін шектеу
        )

        return {"reply": completion.choices[0].message.content}

    except Exception as e:
        print(f"Қате: {e}")
        return {"reply": "Байланыста ақау болды, қайта жазып көрші."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)