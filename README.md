
https://mellullaby.herokuapp.com/

------------------------------------------------

-----Sign up----
POST: /api/auth/register (x-www-form-urlencoded)
	email
	username
	password

----Sign in-----
POST: /api/auth/login (x-www-form-urlencoded)
	email
	password

----Reset Password----
POST: /api/auth/recover (x-www-form-urlencoded)
	email

----Refresh Token----
POST: /api/auth/refreshtoken (x-www-form-urlencoded)
	email
	token(refresh token)

----Sign out----
DELETE: /api/auth/logout (x-www-form-urlencoded)
	token(refresh token)


----auth: bearer token------Gửi kèm token------------

-----Update Profile----
PUT: /api/user/update (x-www-form-urlencoded)----profile------
	nickname
	numphone
	sex
	datebirth
	address

----Update Profile Image------
PUT: /api/user/update (form-data)---profile image-----
	file

-----Show user info-----
GET: /api/user/show (x-www-form-urlencoded)

-----Display Image-------
GET: /api/user/image/:filename

-----Create Event--------
POST: /api/user/event

-----Update Event--------
PUT: /api/user/eventupdate
	id(id sự kiện)
	event(tên sự kiện)
	address(nơi tổ chức)
	bio(mô tả)
	catelogy(loại sự kiện)
	date(ngày diễn ra)
	time(giờ diễn ra)
	group(nhóm sự kiện. VD: Bên nội)
	eventImage(ảnh sự kiện)

-----GET Events--------
GET: /api/user/eventshow (trả về toàn bộ sự kiện của user đó)
--------------------------------------------

