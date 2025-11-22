export interface ExecutiveData {
  top10Companies: top10Companies[];
  chart1: chart1[];
  chart2: chart2[];
  chart3: chart3[];
  chart4: chart4[];
  chart5: chart5[];
}

interface top10Companies {
  companyId: number;
  companyName: string;
}

interface chart1 {
  companyId: number;
  yearAired: number;
  titleCount: number;
}

interface chart2 {
  companyId: number;
  ratingStart: number;
  ratingEnd: number;
  frequency: number;
}

interface chart3 {
  companyId: number;
  companyName: string;
  titleCount: number;
}

interface chart4 {
  companyId: number;
  genreName: string;
  genreCount: number;
}

interface chart5 {
  companyId: number;
  primaryTitle: string;
  popularity: number;
}
