export function request(ctx) {
    const { ingredients = [] } = ctx.args;
    let joinedIngredients = ingredients.join(", ");
    console.log("ingredients available", ingredients, "joined list",joinedIngredients)
    // Construct the prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${joinedIngredients}.`;
   
    // Return the request configuration
    return {
      resourcePath: `/anthropic.claude-3-5-sonnet-20240620-v1:0/invoke`,
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anthropic_version: "bedrock-2024-06-20",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                },
              ],
            },
          ],
        }),
      },
    };
  }
  
  export function response(ctx) {
    // Parse the response body
    console.log("ctx", ctx)
    const parsedBody = JSON.parse(ctx.result.body);
    console.log("parsedBody", parsedBody)
    // Extract the text content from the response
    const res = {
      body: parsedBody.content[0].text,
    };
    // Return the response
    return res;
  }