package model

type User struct {
	Nickname string `json:"nickname"`
	OpenID string `json:"open_id"`
}

func (User) TableName() string {
	return "wx_photo_user"
}
