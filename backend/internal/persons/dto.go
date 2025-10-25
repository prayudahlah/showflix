package persons

type PersonDTO struct {
	PersonID    string  `json:"person_id"`
	PrimaryName string  `json:"primary_name"`
	BirthYear   *int    `json:"birth_year,omitempty"`
	DeathYear   *int    `json:"death_year,omitempty"`
}

func ToDTO(p *Person) PersonDTO {
	var birthYear, deathYear *int
	
	if p.BirthYear.Valid {
		year := int(p.BirthYear.Int32)
		birthYear = &year
	}
	
	if p.DeathYear.Valid {
		year := int(p.DeathYear.Int32)
		deathYear = &year
	}
	
	return PersonDTO{
		PersonID:    p.PersonID,
		PrimaryName: p.PrimaryName,
		BirthYear:   birthYear,
		DeathYear:   deathYear,
	}
}
