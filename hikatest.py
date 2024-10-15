from hikkatl.types import Message
from .. import loader, utils

@loader.tds
class MyModule(loader.Module):
    """My module"""
    strings = {"name": "MyModule", "hi": "Hi!"}
    strings_ru = {"hi": "Привет!"}
    strings_es = {"hi": "¡Hola!"}
    strings_de = {"hi": "Hallo!"}

    @loader.command(
        ru_doc="Ответить 'Привет!'",
        es_doc="Responder '¡Hola!'",
        de_doc="Antworten 'Hallo!'",
    )
    async def hh(self, message: Message):
        """Say hi"""
        await utils.answer(message, self.strings("hi"))
