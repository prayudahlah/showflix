package executive

type GetResponse struct {
	Top10Companies  []Top10Companies  `json:"top_10_companies"`
	Chart1          []Chart1          `json:"chart_1"`
	Chart2          []Chart2          `json:"chart_2"`
	Chart3          []Chart3          `json:"chart_3"`
	Chart4          []Chart4          `json:"chart_4"`
	Chart5          []Chart5          `json:"chart_5"`
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

type Chart2 struct {
	CompanyId      int      `json:"company_id"`
	AverageRating  float64  `json:"average_rating"`
}

type Chart3 struct {
	CompanyId    int     `json:"company_id"`
	CompanyName  string  `json:"company_name"`
	TitleCount   int     `json:"title_count"`
}

type Chart4 struct {
	CompanyId   int     `json:"company_id"`
	GenreName   string  `json:"genre_name"`
	GenreCount  int     `json:"genre_count"`
}

type Chart5 struct {
	CompanyId     int      `json:"company_id"`
	PrimaryTitle  string   `json:"primary_title"`
	Popularity    float64  `json:"popularity"`
}
