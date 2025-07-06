// Human Design gate data and calculations
export const humanDesignData = {
  gates: {
    1: { name: "The Creative", type: "Individual", theme: "Self-Expression" },
    2: { name: "The Receptive", type: "Individual", theme: "Direction" },
    3: { name: "Ordering", type: "Individual", theme: "Innovation" },
    4: { name: "Youthful Folly", type: "Individual", theme: "Answers" },
    5: { name: "Waiting", type: "Individual", theme: "Patterns" },
    6: { name: "Conflict", type: "Tribal", theme: "Intimacy" },
    7: { name: "The Army", type: "Collective", theme: "Leadership" },
    8: { name: "Holding Together", type: "Individual", theme: "Contribution" },
    9: { name: "The Taming Power", type: "Collective", theme: "Focus" },
    10: { name: "Treading", type: "Individual", theme: "Behavior" },
    // Add more gates as needed - this is a simplified version
  },

  // Calculate programming partner gates
  calculateEvolutionGate(personalitySun) {
    // Evolution gate is typically 88 degrees away
    const evolutionGate = personalitySun + 22;
    return evolutionGate > 64 ? evolutionGate - 64 : evolutionGate;
  },

  calculatePurposeGate(designSun) {
    // Purpose gate is typically 88 degrees away from design sun
    const purposeGate = designSun + 22;
    return purposeGate > 64 ? purposeGate - 64 : purposeGate;
  },

  // Generate superhero identity based on gates
  generateSuperheroIdentity(gateData) {
    const personalityGate = this.gates[gateData.personalitySun] || { name: "Unknown", type: "Individual", theme: "Mystery" };
    const designGate = this.gates[gateData.designSun] || { name: "Unknown", type: "Individual", theme: "Mystery" };

    // Sample superhero titles based on gate combinations
    const titles = [
      "The Cosmic Architect",
      "The Frequency Master",
      "The Blueprint Keeper",
      "The Pattern Weaver",
      "The Energy Transmitter",
      "The Quantum Navigator",
      "The Stellar Catalyst",
      "The Dimensional Bridge"
    ];

    const title = titles[Math.floor(Math.random() * titles.length)];

    return {
      title,
      type: personalityGate.type,
      strategy: this.getStrategy(personalityGate.type),
      profile: this.getProfile(gateData.personalitySun, gateData.designSun),
      authority: this.getAuthority(designGate.type),
      theme: personalityGate.theme,
      auraColor: this.getAuraColor(gateData.personalitySun)
    };
  },

  getStrategy(type) {
    const strategies = {
      "Individual": "To Inform",
      "Tribal": "To Respond",
      "Collective": "To Wait for Recognition"
    };
    return strategies[type] || "To Flow";
  },

  getProfile(personalitySun, designSun) {
    // Simplified profile calculation
    const profiles = ["1/3", "1/4", "2/4", "2/5", "3/5", "3/6", "4/6", "4/1", "5/1", "5/2", "6/2", "6/3"];
    const index = (personalitySun + designSun) % profiles.length;
    return profiles[index];
  },

  getAuthority(type) {
    const authorities = {
      "Individual": "Emotional",
      "Tribal": "Sacral",
      "Collective": "Splenic"
    };
    return authorities[type] || "Inner";
  },

  getAuraColor(gate) {
    const colors = ["#F49558", "#D35E0E", "#409FA1", "#F6D541", "#244A49"];
    return colors[gate % colors.length];
  },

  // Validate gate number
  isValidGate(gate) {
    return gate >= 1 && gate <= 64;
  }
};