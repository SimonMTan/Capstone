from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,ValidationError

def validate_comment(form, field):
    if len(field.data) < 0:
        raise ValidationError('Comment must be more than 1 characters long.')
    if len(field.data) > 255:
        raise ValidationError('Comment must be less than 255 characters long.')


class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(),validate_comment])
