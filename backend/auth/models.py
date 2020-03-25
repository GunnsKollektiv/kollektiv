from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _

from group.models import CustomGroup

# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#substituting-a-custom-user-model
# https://www.fomfus.com/articles/how-to-use-email-as-username-for-django-authentication-removing-the-username


class UserManager(BaseUserManager):
    """ Custom model manager for custom user model """

    use_in_migrations = True

    def _create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError('The email must be set.')
        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **other_fields):
        other_fields.setdefault('is_staff', False)
        other_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **other_fields)

    def create_superuser(self, email, password=None, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **other_fields)


class User(AbstractUser):
    """ Custom user with email as username field """

    username = None
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def has_group(self):
        return len(self.groups.all()) > 0

    def get_group(self):
        if self.has_group():
            id = self.groups.first().id
            return CustomGroup.objects.get(id=id)
        return None
