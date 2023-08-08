const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const run = async()=>{

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log("response",response.data)
}
run()