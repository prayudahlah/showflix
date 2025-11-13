package login

type Role struct {
	RoleName        string  `db:"RoleName"`
	Username        string  `db:"Username"`
	Salt            []byte  `db:"Salt"`
	HashedPassword  []byte  `db:"HashedPassword"`
}
