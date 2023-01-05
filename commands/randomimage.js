const buildEmbed = require('../utils/buildEmbed');
const randomImage = require('../utils/randomImage');

module.exports = async (message, prompt = '1', openai) => {
  let num = Number(prompt.trim().match(/\d+/)[0]);

  const restOfText = num > 1 ? `${num} random images` : 'a random image';

  message.reply(`One moment,I'm crafting ${restOfText}...`);

  if (!!num && num > 1) {
    const embeds = [];
    while (num > 0) {
      const imageUrl = await randomImage(openai);
      const embed = buildEmbed(imageUrl);
      embeds.push(embed);
      num--;
    }

    return await message.reply({ embeds });
  }

  const imageUrl = await randomImage(openai);
  const embed = buildEmbed(imageUrl);

  return await message.reply({ embeds: [embed] });
};
