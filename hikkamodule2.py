from hikkatl.types import Message
from .. import loader, utils
import requests

API_KEY = '655f4d5532d865c18377512a9e3ef15d'

@loader.tds
class GPTModule(loader.Module):
    """Модуль для работы с ChatGPT"""
    strings = {
        "name": "GPTModule",
        "gpt_error": "Ошибка при обращении к API.",
        "gpt_no_text": "Пожалуйста, введите текст после команды .gpt"
    }

    @loader.command(
        ru_doc="Отправить текст в ChatGPT и получить ответ.",
    )
    async def gpt(self, message: Message):
        """Команда для взаимодействия с ChatGPT"""
        text = message.text.split('.gpt ', 1)[1] if '.gpt ' in message.text else None
        
        if not text:
            await utils.answer(message, self.strings("gpt_no_text"))
            return
        
        response = await self.get_gpt_response(text)
        await utils.answer(message, response)

    async def get_gpt_response(self, prompt: str) -> str:
        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': prompt}]
        }
        
        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return self.strings("gpt_error")

# Не забудьте добавить код для инициализации модуля, если это необходимо.
