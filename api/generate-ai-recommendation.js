import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";
import { OpenAI } from "openai";

export default async function handler(req, res) {
  console.log("AI recommendation API called");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Authenticate the user
    const user = await authenticateUser(req);
    console.log("User authenticated:", user.email);
    
    // Get the data from the request
    const { planType, planData } = req.body;
    
    if (!planType || !planData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Generate prompt based on plan type
    let prompt = "";
    if (planType === "business") {
      prompt = generateBusinessPrompt(planData);
    } else if (planType === "investment") {
      prompt = generateInvestmentPrompt(planData);
    } else {
      return res.status(400).json({ error: 'Invalid plan type' });
    }
    
    console.log("Sending request to OpenAI");
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert business and investment advisor. Provide detailed, actionable recommendations based on the user's plan."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });
    
    console.log("Received response from OpenAI");
    
    // Process the response
    const aiResponse = completion.choices[0].message.content;
    
    // Parse the response to extract key information
    const recommendations = parseAiResponse(aiResponse, planType);
    
    return res.status(200).json({ recommendations });
    
  } catch (error) {
    console.error("Error generating AI recommendation:", error);
    Sentry.captureException(error);
    return res.status(500).json({ 
      error: 'Error generating recommendations',
      message: error.message
    });
  }
}

function generateBusinessPrompt(planData) {
  return `
Please analyze the following business plan and provide detailed recommendations:

Business Name: ${planData.name || 'Not specified'}
Industry: ${planData.industry || 'Not specified'}
Target Market: ${planData.targetMarket || 'Not specified'}
Business Goals: ${planData.goals?.join(', ') || 'Not specified'}
Competitive Advantage: ${planData.competitiveAdvantage || 'Not specified'}

Financial Projections:
- Initial Investment: ${planData.financialProjections?.initialInvestment || 'Not specified'}
- Projected Revenue: ${planData.financialProjections?.projectedRevenue || 'Not specified'}
- Projected Expenses: ${planData.financialProjections?.projectedExpenses || 'Not specified'}
- Break-even Point: ${planData.financialProjections?.breakEvenPoint || 'Not specified'}

Please provide:
1. A brief summary of the overall plan
2. 2-3 key strengths of the plan
3. 2-3 areas that need improvement
4. 3-5 specific, actionable suggestions to improve the business plan
`;
}

function generateInvestmentPrompt(planData) {
  return `
Please analyze the following investment strategy and provide detailed recommendations:

Strategy Name: ${planData.name || 'Not specified'}
Investment Type: ${planData.type || 'Not specified'}
Amount to Invest: ${planData.amount || 'Not specified'}
Time Horizon: ${planData.timeHorizon || 'Not specified'}
Risk Tolerance: ${planData.riskTolerance || 'Not specified'}
Investment Goals: ${planData.goals || 'Not specified'}

Current Investments:
${planData.currentInvestments?.map(i => `- ${i.name}: ${i.amount}`).join('\n') || 'None specified'}

Please provide:
1. A brief overview of the investment strategy
2. Risk profile assessment
3. Recommended asset allocation with percentages and brief descriptions
4. 2-3 timeline considerations based on the time horizon
5. 4-5 specific next steps to implement the strategy
`;
}

function parseAiResponse(aiResponse, planType) {
  // For a real application, you would implement more sophisticated parsing
  // This is a simple implementation for demo purposes
  
  if (planType === "business") {
    return {
      summary: extractSection(aiResponse, "summary", "overall", "brief"),
      strengths: extractListItems(aiResponse, "strengths", "key strengths"),
      weaknesses: extractListItems(aiResponse, "areas", "improvement", "weaknesses"),
      suggestions: extractListItems(aiResponse, "suggestions", "actionable")
    };
  } else {
    return {
      overview: extractSection(aiResponse, "overview"),
      riskProfile: {
        level: extractLevel(aiResponse, "risk"),
        description: extractSection(aiResponse, "risk profile", "risk assessment")
      },
      allocationRecommendations: extractAllocation(aiResponse),
      timelineConsiderations: extractListItems(aiResponse, "timeline", "considerations"),
      nextSteps: extractListItems(aiResponse, "next steps", "implement")
    };
  }
}

// Helper functions for parsing - simplified for demo
function extractSection(text, ...keywords) {
  const paragraphs = text.split('\n\n');
  
  for (const paragraph of paragraphs) {
    if (keywords.some(keyword => paragraph.toLowerCase().includes(keyword.toLowerCase()))) {
      return paragraph.replace(/^[#\d\.\s]*(Summary|Overview|Risk Profile|Risk Assessment):\s*/i, '');
    }
  }
  
  return "Analysis not available";
}

function extractListItems(text, ...keywords) {
  const lines = text.split('\n');
  const items = [];
  let capturing = false;
  
  for (const line of lines) {
    // Start capturing when we find a section containing our keywords
    if (!capturing && keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))) {
      capturing = true;
      continue;
    }
    
    // If we're capturing and find a line that starts with a number, dash, or asterisk, it's likely a list item
    if (capturing && /^\s*[\d\-\*\.]\s+/.test(line)) {
      items.push(line.replace(/^\s*[\d\-\*\.]\s+/, ''));
    }
    
    // Stop capturing when we hit another section header (usually starts with a number or heading)
    if (capturing && items.length > 0 && /^\s*[\d#]/.test(line) && !line.includes(items[items.length - 1])) {
      break;
    }
  }
  
  return items.length > 0 ? items : ["No specific recommendations available"];
}

function extractLevel(text, keyword) {
  const riskLevels = ["conservative", "moderately conservative", "moderate", "moderately aggressive", "aggressive"];
  const lowerText = text.toLowerCase();
  
  for (const level of riskLevels) {
    if (lowerText.includes(level)) {
      return level;
    }
  }
  
  return "moderate";
}

function extractAllocation(text) {
  // This is a simplified implementation - a real app would use more sophisticated parsing
  const categories = ["Stocks", "Bonds", "Cash", "Real Estate", "Alternative Investments", "Commodities"];
  const allocations = [];
  
  // Look for percentage patterns like "50%" or "50 percent"
  const percentageRegex = /(\d+)(?:\s*%|\s*percent)/g;
  let match;
  
  let index = 0;
  for (const category of categories) {
    if (text.includes(category)) {
      const searchText = text.substring(text.indexOf(category), text.indexOf(category) + 100);
      
      // Reset lastIndex to avoid issues with global regex
      percentageRegex.lastIndex = 0;
      match = percentageRegex.exec(searchText);
      
      if (match) {
        allocations.push({
          category,
          percentage: parseInt(match[1], 10),
          description: `Focus on ${category.toLowerCase()} with moderate risk`
        });
      }
    }
    
    // If we have 4 allocations or reach the end, stop looking
    if (allocations.length >= 4 || index === categories.length - 1) {
      break;
    }
    index++;
  }
  
  // If we couldn't extract meaningful allocations, provide default ones
  if (allocations.length === 0) {
    return [
      { category: "Stocks", percentage: 50, description: "Focus on blue-chip and dividend stocks" },
      { category: "Bonds", percentage: 30, description: "Government and high-grade corporate bonds" },
      { category: "Alternative Investments", percentage: 15, description: "REITs and commodities" },
      { category: "Cash", percentage: 5, description: "Emergency fund and short-term needs" }
    ];
  }
  
  return allocations;
}