package marketing

type GetResponse struct {
	ProductionCompanies  []ProductionCompanies  `json:"productionCompanies"`
	Metrics              []Metrics              `json:"metrics"`
	Chart1               []Chart1               `json:"chart1"`
	Chart2               []Chart2               `json:"chart2"`
	Chart3               []Chart3               `json:"chart3"`
	Chart4               []Chart4               `json:"chart4"`
	Chart5               []Chart5               `json:"chart5"`
}

type ProductionCompanies struct {
	CompanyId    int     `json:"companyId"`
	CompanyName  string  `json:"companyName"`
}

type Metrics struct {
	CompanyId          int      `json:"companyId"`
	ShowCount          int      `json:"showCount"`
	AverageRating      float64  `json:"averageRating"`
	AveragePopularity  float64  `json:"averagePopularity"`
	Rank               int      `json:"rank"`
}

type Chart1 struct {
	CompanyId   int    `json:"companyId"`
	RegionName  string `json:"regionName"`
	TotalTitles int    `json:"totalTitles"`
}

type Chart2 struct {
	CompanyId    int    `json:"companyId"`
	NetworkName  string `json:"networkName"`
	NetworkCount int    `json:"networkCount"`
}

type Chart3 struct {
	CompanyId     int     `json:"companyId"`
	PrimaryTitle  string  `json:"primaryTitle"`
	VoteCount     int     `json:"voteCount"`
	AverageRating float64 `json:"averageRating"`
	Popularity    float64 `json:"popularity"`
}

type Chart4 struct {
	CompanyId    int     `json:"companyId"`
	PrimaryTitle string  `json:"primaryTitle"`
	GenreName    string  `json:"genreName"`
}

type Chart5 struct {
	CompanyId     int      `json:"companyId"`
	PrimaryTitle  string   `json:"primaryTitle"`
	Popularity    float64  `json:"popularity"`
}
