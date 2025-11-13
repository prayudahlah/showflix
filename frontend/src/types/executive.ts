export interface ExecutiveData {
  top10Companies: top10Companies[];
  chart1: chart1[];
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
