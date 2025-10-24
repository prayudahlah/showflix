package persons

type Persons struct {
	PersonID string `json:"person_id"`
	PrimaryName string `json:"primary_name"`
	BirthYear int `json:"birth_year"`
	DeathYear int `json:"death_year"`
}
