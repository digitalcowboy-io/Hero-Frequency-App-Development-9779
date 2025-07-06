// OpenAI integration for generating mantras and stories
export const openaiHelpers = {
  async generateMantras(gateData) {
    const prompt = `
    Based on these Human Design gates, create 4 powerful, personalized affirmations for someone discovering their Hero Frequency:

    Personality Sun: Gate ${gateData.personalitySun}
    Design Sun: Gate ${gateData.designSun}
    Evolution Gate: Gate ${gateData.evolutionGate}
    Purpose Gate: Gate ${gateData.purposeGate}

    Create mantras that are:
    - Empowering and forward-looking
    - Specific to their unique gate combination
    - Written in first person ("I am", "I embody", etc.)
    - Cosmic and heroic in tone
    - Each 10-15 words maximum

    Return as JSON array of 4 strings.
    `;

    try {
      // In a real implementation, you would call OpenAI API here
      // For now, we'll return sample mantras based on the gates
      const sampleMantras = [
        `I am the architect of my own cosmic destiny, aligned with gate ${gateData.personalitySun}`,
        `My unique frequency illuminates the path for others to follow`,
        `I embody the wisdom of gate ${gateData.designSun} in every decision I make`,
        `I transmit my authentic power through purposeful action and divine alignment`
      ];

      return sampleMantras;
    } catch (error) {
      console.error('Error generating mantras:', error);
      return [
        "I am aligned with my unique Hero Frequency",
        "I embody my authentic power with cosmic purpose",
        "I illuminate the path for others through my example",
        "I transmit wisdom through aligned action"
      ];
    }
  },

  async generatePersonalMythos(gateData, userProfile) {
    const prompt = `
    Create a personalized Hero's Journey narrative for someone with these Human Design gates:

    Personality Sun: Gate ${gateData.personalitySun}
    Design Sun: Gate ${gateData.designSun}
    Evolution Gate: Gate ${gateData.evolutionGate}
    Purpose Gate: Gate ${gateData.purposeGate}

    Create a 7-stage narrative following this structure:
    1. Ordinary Matrix - Their life before awakening
    2. The Glitch - What made them question reality
    3. Taking the Pill - The moment of choosing transformation
    4. Blueprint Revealed - Discovering their unique design
    5. Integration Challenges - Obstacles in embodying their truth
    6. Frequency Mastery - Learning to use their gifts
    7. Transmission Mode - How they serve others

    Each stage should be 2-3 sentences, cosmic and empowering in tone.
    Return as JSON object with stages as keys.
    `;

    try {
      // Sample story arc based on gates
      const sampleStory = {
        "Ordinary Matrix": "You lived in a world of expectations, following paths that others laid out for you. Deep inside, you felt a calling that you couldn't quite name, a frequency that was uniquely yours waiting to be discovered.",
        "The Glitch": "Something shifted when you realized that the conventional rules didn't apply to your unique design. The matrix of 'normal' began to crack, revealing glimpses of your true potential.",
        "Taking the Pill": "You chose to dive deep into your authentic self, embracing the unknown rather than the familiar. This was your moment of saying yes to your Hero Frequency.",
        "Blueprint Revealed": `Your gates ${gateData.personalitySun} and ${gateData.designSun} illuminated your cosmic blueprint. You saw clearly how your unique combination creates a frequency that the world needs.`,
        "Integration Challenges": "Learning to trust your inner authority while navigating a world that doesn't always understand your frequency. The challenge was staying true to your design while still connecting with others.",
        "Frequency Mastery": "You learned to embody your gifts fully, using your unique combination of gates to create impact. Your frequency became a beacon for others seeking their own path.",
        "Transmission Mode": "Now you serve as a lighthouse for other heroes beginning their journey. Your mastered frequency helps others discover and trust their own unique design."
      };

      return sampleStory;
    } catch (error) {
      console.error('Error generating personal mythos:', error);
      return {
        "Ordinary Matrix": "You lived in a world of expectations, following conventional paths.",
        "The Glitch": "Something shifted when you realized the conventional rules didn't apply to you.",
        "Taking the Pill": "You chose to dive deep into your authentic self.",
        "Blueprint Revealed": "Your unique gates illuminated your cosmic blueprint.",
        "Integration Challenges": "Learning to trust your inner authority while navigating the world.",
        "Frequency Mastery": "You learned to embody your gifts fully.",
        "Transmission Mode": "Now you serve as a lighthouse for other heroes."
      };
    }
  }
};