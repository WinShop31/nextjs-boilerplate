import json
import aiohttp
from hikkatl.types import Message
from .. import loader, utils

@loader.tds
class BypassModule(loader.Module):
    """Bypass module
    🌟 Создано - @aurafunny
    """
    strings = {"name": "BypassModule", "key_response": 'Ваш ключ - "{key}"'}

    @loader.command(
        ru_doc="Использование .key <url>",
    )
    async def key(self, message: Message):
        """Получить ключ из URL"""
        args = utils.get_args(message)
        if not args:
            await utils.answer(message, "Использование .key <url>")
            return

        url = f"https://kobayashi-heart-attack.vercel.app/api/kobayashi?url={args[0]}&kobayashi=NoHome"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.text()
                    try:
                        json_data = json.loads(data)
                        key = json_data.get("key", "")
                        await utils.answer(message, self.strings("key_response").format(key=key))
                    except json.JSONDecodeError:
                        await utils.answer(message, "Ошибка при обработке ответа.")
                else:
                    await utils.answer(message, "Ошибка при запросе к сайту.")

    @loader.command(
        ru_doc="Проверить и обновить модуль",
    )
    async def check(self, message: Message):
        """Проверить и обновить модуль"""
        await utils.answer(message, "Начинаю проверку и обновление модуля...")
        url = "https://raw.githubusercontent.com/WinShop31/nextjs-boilerplate/refs/heads/main/hikatest.py"

        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    new_code = await response.text()
                    # Здесь необходимо сохранить новый код в файл
                    with open("hikatest.py", "w") as file:
                        file.write(new_code)
                    await utils.answer(message, "Модуль успешно обновлён!")
                else:
                    await utils.answer(message, "Ошибка при загрузке нового кода.")
