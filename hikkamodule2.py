import requests
from hikka import hikka, Message, Command

API_KEY = '655f4d5532d865c18377512a9e3ef15d'

@hikka.on_message(Command('.gpt'))
async def gpt_command(message: Message):
    text = message.text.split('.gpt ', 1)[1]
    
    if not text:
        await message.reply("Пожалуйста, введите текст после команды .gpt")
        return
    
    response = await get_gpt_response(text)
    
    await message.reply(response)

async def get_gpt_response(prompt: str) -> str:
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'gpt-3.5-turbo',  # или другой доступный вам
        'messages': [{'role': 'user', 'content': prompt}]
    }
    
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        return "Ошибка при обращении к API."

# Запуск бота
hikka.run()
