package executive

type GetResponse struct {
	Top10Companies  []Top10Companies  `json:"top_10_companies"`
	Chart1          []Chart1          `json:"chart_1"`
}

type Top10Companies struct {
	CompanyId    int     `json:"company_id"`
	CompanyName  string  `json:"company_name"`
}

type Chart1 struct {
	CompanyId   int  `json:"company_id"`
	YearAired   int  `json:"year_aired"`
	TitleCount  int  `json:"title_count"`
}
