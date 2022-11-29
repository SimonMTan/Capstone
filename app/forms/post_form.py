from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    post_msg = StringField('postmsg')
    post_img = StringField('postimg' )
    post_video = StringField('postvideo')
