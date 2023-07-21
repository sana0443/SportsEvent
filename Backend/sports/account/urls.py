from . import views
from django.urls import path

urlpatterns = [
    path('',views.index),
    path('register/',views.UserSignup.as_view()),
    path('signin/',views.UserLogin.as_view()),
    path('AdminLogin/',views.AdminLoginView.as_view()),
    path('AdminLogout',views.AdminLogoutView.as_view()),
    path('UserLogout',views.UserLogoutView.as_view()),
    path('userdata',views.UserDataView.as_view()),
    path('created/',views.create_user,name="created"),
    # path('account/userdata/<int:user_id>/', UserProfileView.as_view(), name='user-profile'),
    

    
]