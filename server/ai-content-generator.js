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
- An inline image suggestion that fits naturally within the content (describe what image would help illustrate the concepts)

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
        {"type": "quote", "text": "..."},
        {"type": "image", "prompt": "DALL-E prompt for inline image", "placement": "after paragraph 2"}
      ]
    }
  ],
  "keyTakeaways": ["takeaway1", "takeaway2", "takeaway3"],
  "nextSteps": ["step1", "step2", "step3"]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
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

  async generateThemeAndStyle(title, category) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return {
        primary: "#9333EA",
        secondary: "#3B82F6",
        accent: "#10B981",
        headerStyle: "modern",
        fontPrimary: "Helvetica-Bold",
        fontSecondary: "Helvetica",
        description: "Default professional theme"
      };
    }

    try {
      const prompt = `Generate a complete visual theme and styling for a PDF document about "${title}" in the ${category} category.

Choose styling that:
- Reflects the topic and category perfectly
- Is professional and readable
- Creates good contrast for text
- Works well together visually
- Has a unique header style appropriate for the topic

Respond in JSON format:
{
  "primary": "#HEX",
  "secondary": "#HEX",
  "accent": "#HEX",
  "headerStyle": "modern|classic|minimalist|bold|elegant",
  "fontPrimary": "Helvetica-Bold",
  "fontSecondary": "Helvetica",
  "description": "Brief explanation of why these colors and style fit the topic"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional designer who understands color theory, typography, and branding. Provide accessible, professional design schemes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const content = response.choices[0].message.content;
      if (!content || content.trim() === '') {
        throw new Error('Empty response from OpenAI');
      }
      const theme = JSON.parse(content);
      return theme;
    } catch (error) {
      console.error('Theme generation error:', error);
      return {
        primary: "#9333EA",
        secondary: "#3B82F6",
        accent: "#10B981",
        headerStyle: "modern",
        fontPrimary: "Helvetica-Bold",
        fontSecondary: "Helvetica",
        description: "Default professional theme"
      };
    }
  }

  async generateChartData(title, category, sectionTitle) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return {
        type: "bar",
        data: [0.4, 0.7, 0.55, 0.8, 0.6],
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        title: "Progress Overview"
      };
    }

    try {
      const prompt = `Generate appropriate chart data for a section titled "${sectionTitle}" in a PDF about "${title}" (${category} category).

Choose a chart type and data that:
- Fits the section topic naturally
- Is professional and informative
- Uses realistic, relevant data points
- Has 4-6 data points

Respond in JSON format:
{
  "type": "bar|line|donut|radar",
  "data": [array of 4-6 numbers between 0 and 1],
  "labels": [array of 4-6 short labels],
  "title": "Chart title"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a data visualization expert who creates meaningful, professional charts."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const chartData = JSON.parse(response.choices[0].message.content);
      return chartData;
    } catch (error) {
      console.error('Chart generation error:', error);
      return {
        type: "bar",
        data: [0.4, 0.7, 0.55, 0.8, 0.6],
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        title: "Progress Overview"
      };
    }
  }

  async generateHeroPage(title, category, type) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return {
        mainTitle: title,
        subtitle: type,
        description: `A comprehensive ${type.toLowerCase()} for ${category.toLowerCase()}`,
        tagline: "Achieve your goals with structured guidance"
      };
    }

    try {
      const prompt = `Create a unique, compelling hero page for a PDF titled "${title}" (${type} in ${category} category).

Make it:
- Inspiring and professional
- Tailored to the specific topic
- Engaging for the target audience
- Different from generic templates

Respond in JSON format:
{
  "mainTitle": "${title}",
  "subtitle": "creative subtitle",
  "description": "2-3 sentence compelling description",
  "tagline": "inspiring tagline"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a creative copywriter who crafts compelling, unique content for professional documents."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const heroContent = JSON.parse(response.choices[0].message.content);
      return heroContent;
    } catch (error) {
      console.error('Hero page generation error:', error);
      return {
        mainTitle: title,
        subtitle: type,
        description: `A comprehensive ${type.toLowerCase()} for ${category.toLowerCase()}`,
        tagline: "Achieve your goals with structured guidance"
      };
    }
  }

  async generateEndingPage(title, category, type) {
    const openai = this.getOpenAIClient();
    if (!openai) {
      return {
        thankYouMessage: "Thank You!",
        closingMessage: "Continue your journey to excellence",
        finalThought: "Your success begins now"
      };
    }

    try {
      const prompt = `Create a unique, inspiring ending page for a PDF titled "${title}" (${type} in ${category} category).

Make it:
- Motivating and forward-looking
- Specific to the topic
- Memorable and impactful
- Different from generic templates

Respond in JSON format:
{
  "thankYouMessage": "unique thank you message (2-4 words)",
  "closingMessage": "inspiring closing message",
  "finalThought": "memorable final thought"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a creative copywriter who crafts memorable, inspiring closing messages for professional documents."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 500
      });

      const endingContent = JSON.parse(response.choices[0].message.content);
      return endingContent;
    } catch (error) {
      console.error('Ending page generation error:', error);
      return {
        thankYouMessage: "Thank You!",
        closingMessage: "Continue your journey to excellence",
        finalThought: "Your success begins now"
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
        model: "gpt-4o",
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
