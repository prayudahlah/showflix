package persons

type PersonService interface {
	GetByID(id string) (*Person, error)
	// Create(person Person) error
}

type personService struct {
	repo PersonRepo
}

func NewService(repo PersonRepo) PersonService {
	 return &personService {repo: repo}
}

func (s *personService) GetByID(id string) (*Person, error) {
	return s.repo.GetByID(id)
}

// func (s *personService) Create(person Person) error {
//
// }
