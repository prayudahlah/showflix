export interface MarketingData {
  productionCompanies: productionCompanies[];
  metrics: metrics[];
  chart1: chart1[];
  chart2: chart2[];
  chart3: chart3[];
  chart4: chart4[];
  chart5: chart5[];
}

interface productionCompanies {
  companyId: number;
  companyName: string;
}

interface metrics {
  companyId: number;
  showCount: number;
  averageRating: number;
  averagePopularity: number;
  rank: number;
}

interface chart1 {
  companyId: number;
  regionName: string;
  totalTitles: number;
}

interface chart2 {
  companyId: number;
  networkName: string;
  networkCount: number;
}

interface chart3 {
  companyId: number;
  primaryTitle: string;
  voteCount: number;
  averageRating: number;
  popularity: number;
}

interface chart4 {
  companyId: number;
  primaryTitle: string;
  genreName: string;
}

interface chart5 {
  companyId: number;
  primaryTitle: string;
  popularity: number;
}
