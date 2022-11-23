from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    post_msg = StringField('postmsg', validators=[DataRequired()])
    post_img = StringField('postimg', validators=[DataRequired()])
    post_video = StringField('postvideo', validators=[DataRequired()])
