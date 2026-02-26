from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, HiddenField
from wtforms.validators import DataRequired, Length


class LoginForm(FlaskForm):
    roll = StringField("ID", validators=[DataRequired(), Length(1, 20)])
    password = PasswordField("Password", validators=[DataRequired(), Length(6, 128)])
    captcha = StringField("Enter Captcha", validators=[DataRequired(), Length(4, 4)])
    submit = SubmitField("Login")


class VerifyForm(FlaskForm):
    roll = HiddenField(validators=[DataRequired()])
    password = HiddenField(validators=[DataRequired()])
    submit = SubmitField("Verify Password")