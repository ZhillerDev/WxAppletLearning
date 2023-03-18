package model

type Issue struct {
	Name string `json:"name"`
	Content string `json:"content"`
	Location string `json:"location"`
	Types string `json:"types"`
	Photos string `json:"photos"`
}

func (Issue) TableName() string {
	return "wx_photo_issue"
}
