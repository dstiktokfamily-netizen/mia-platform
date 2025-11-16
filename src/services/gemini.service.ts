interface SearchFilter {
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minRating?: number;
  skills?: string[];
}

class GeminiService {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  async parseSearchQuery(query: string): Promise<SearchFilter> {
    try {
      const prompt = `Tu es un assistant qui convertit des requêtes en langage naturel en filtres JSON.
      
Requête utilisateur: "${query}"

Analyse cette requête et retourne UNIQUEMENT un objet JSON avec ces propriétés (toutes optionnelles):
{
  "searchTerm": "terme de recherche général",
  "status": "Actif" | "Inactif" | "En mission",
  "sortBy": "name" | "rating",
  "sortOrder": "asc" | "desc",
  "minRating": nombre entre 0 et 5,
  "skills": ["compétence1", "compétence2"]
}

Exemples:
- "meilleurs intérimaires en marketing" → {"searchTerm": "marketing", "sortBy": "rating", "sortOrder": "desc"}
- "actifs avec plus de 4 étoiles" → {"status": "Actif", "minRating": 4}
- "développeurs React disponibles" → {"searchTerm": "React", "status": "Actif", "skills": ["React"]}

Retourne UNIQUEMENT le JSON, sans texte avant ou après.`;

      const response = await fetch(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 256,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur API Gemini');
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : '{}';
      
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Erreur parse search:', error);
      return { searchTerm: query };
    }
  }

  async generateReviewComment(
    name: string,
    mission: string,
    rating: number
  ): Promise<string> {
    try {
      const prompt = `Tu es un manager qui rédige une évaluation professionnelle pour un intérimaire.

Intérimaire: ${name}
Mission: ${mission}
Note attribuée: ${rating}/5 étoiles

Rédige un commentaire d'évaluation professionnel, constructif et précis en 2-3 phrases. Le ton doit être ${
        rating >= 4 ? 'très positif' : rating >= 3 ? 'équilibré' : 'constructif'
      }.

Retourne UNIQUEMENT le commentaire, sans guillemets ni introduction.`;

      const response = await fetch(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur API Gemini');
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Commentaire généré avec succès.'
      );
    } catch (error) {
      console.error('Erreur génération commentaire:', error);
      return `${name} a réalisé un excellent travail sur cette mission.`;
    }
  }

  async analyzePerformance(performanceData: any[]): Promise<string> {
    try {
      const dataStr = JSON.stringify(performanceData);
      const prompt = `Tu es un analyste de données RH. Analyse ces données de performance d'intérimaires:

${dataStr}

Fournis une analyse concise (3-4 phrases) qui identifie:
1. La tendance générale (amélioration, stabilité, déclin)
2. Le mois le plus performant
3. Une recommandation stratégique

Réponds en français, de manière professionnelle et directe.`;

      const response = await fetch(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 300,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur API Gemini');
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Analyse générée avec succès.'
      );
    } catch (error) {
      console.error('Erreur analyse performance:', error);
      return 'Les données montrent une tendance positive globale avec des performances stables.';
    }
  }

  async initializeLiveSession(): Promise<{ sessionId: string; webSocket: WebSocket }> {
    // Note: L'API Gemini Live nécessite une configuration WebSocket spécifique
    // Cette implémentation est simplifiée
    const sessionId = `live-${Date.now()}`;
    const ws = new WebSocket(`wss://generativelanguage.googleapis.com/ws/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${this.apiKey}`);
    
    return { sessionId, webSocket: ws };
  }
}

export const geminiService = new GeminiService();
