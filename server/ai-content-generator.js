import OpenAI from "openai";

// Blueprint reference: javascript_openai
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

export class AIContentGenerator {
  constructor() {
    this.openai = null;
  }

  getOpenAIClient() {
    if (!this.openai && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return this.openai;
  }
  async generatePDFContent(title, category, type, sections) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return null;
    }

    try {
      const prompt = `You are an expert content writer creating a professional ${type} about "${title}" in the ${category} category.

Generate comprehensive, engaging, and informative content for the following sections:
${sections.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}

For each section, provide:
- An engaging introduction that connects to the topic
- 3-5 well-developed paragraphs with practical insights
- Key strategies or actionable advice (as bullet points)
- A relevant quote or key takeaway
- Real-world examples when applicable

Make the content professional, informative, and valuable. Tailor the tone and depth to the category.

Respond in JSON format with this structure:
{
  "executiveSummary": "A compelling 5-paragraph executive summary",
  "sections": [
    {
      "title": "Section Title",
      "content": [
        {"type": "paragraph", "text": "..."},
        {"type": "heading", "text": "..."},
        {"type": "bullets", "items": ["...", "..."]},
        {"type": "quote", "text": "..."}
      ]
    }
  ],
  "keyTakeaways": ["takeaway1", "takeaway2", "takeaway3"],
  "nextSteps": ["step1", "step2", "step3"]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are a professional content writer and educator who creates comprehensive, valuable educational materials. Always provide well-structured, informative content that helps readers learn and grow."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192
      });

      const content = JSON.parse(response.choices[0].message.content);
      return content;
    } catch (error) {
      console.error('AI content generation error:', error);
      return null;
    }
  }

  async generateThemeColors(title, category) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return {
        primary: "#9333EA",
        secondary: "#3B82F6",
        accent: "#10B981",
        description: "Default professional theme"
      };
    }

    try {
      const prompt = `Generate a professional color theme for a PDF document about "${title}" in the ${category} category.

Choose colors that:
- Reflect the topic and category
- Are professional and readable
- Create good contrast for text
- Work well together visually

Respond in JSON format:
{
  "primary": "#HEX",
  "secondary": "#HEX",
  "accent": "#HEX",
  "description": "Brief explanation of why these colors fit the topic"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are a professional designer who understands color theory and branding. Provide accessible, professional color schemes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const theme = JSON.parse(response.choices[0].message.content);
      return theme;
    } catch (error) {
      console.error('Theme generation error:', error);
      return {
        primary: "#9333EA",
        secondary: "#3B82F6",
        accent: "#10B981",
        description: "Default professional theme"
      };
    }
  }

  async generateImagePrompt(title, category, context = "cover") {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return `Professional illustration representing ${category}, modern, clean, business-appropriate, high quality`;
    }

    try {
      const prompt = `Create a detailed DALL-E image prompt for a ${context} image in a professional PDF about "${title}" in the ${category} category.

The prompt should describe:
- A professional, clean, and modern visual
- Relevant imagery that represents the topic
- Appropriate for business/educational materials
- No text or words in the image

Return JSON:
{
  "imagePrompt": "detailed DALL-E prompt",
  "description": "what the image represents"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating effective DALL-E prompts for professional documents."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result.imagePrompt;
    } catch (error) {
      console.error('Image prompt generation error:', error);
      return `Professional illustration representing ${category}, modern, clean, business-appropriate, high quality`;
    }
  }

  async generateImage(prompt) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return null;
    }

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Image generation error:', error);
      return null;
    }
  }
}
