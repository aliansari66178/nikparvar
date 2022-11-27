# تولید شعر با شبکه عصبی LSTM و تنسورفلو



![test](1.jpeg)


یادگیری عمیق ابزاری فوق العاده برای ساخت پروژه های مهیج و سرگرم‌کننده است، هر روز خبری در مورد کاربرد های جدید یادگیری عمیق منتشر میشود و همگان را در تعجب فرو میبرد، آموزش این مدل های جذاب هم در نوع خودش سرگرم‌کننده است مخصوصا مدل های مرتبط به پردازش زبان طبیعی(NLP).


در این ویرگول میخواهم نشان بدهم چگونه میتوان از یادگیری عمیق برای تولید شعر استفاده کنیم، مدلی که خواهیم ساخت، ارتباط بین کارکتر ها را متوجه میشود و احتمال وقوع کارکتر بعدی را محاسبه میکند.


> در این پروژه از شبکه عصبی LSTM استفاده خواهیم کرد. به طور خلاصه، LSTM یک نوع خاص از یک شبکه عصبی RNN است که در پردازش داده هایی که دارای توالی منظم و مرتبط هستند استفاده میشود. مثل متون، موسیقی ها، ویدئو ها و...
> 
> تفاوت RNN ها با شبکه های عصبی کلاسیک داشتن وابستگی زمانی یا اثر حافظه است که داده های قبلی را در حافظه به خاطر میسپارد تا در تصمیم گیری های بعدی استفاده کند.
> 
> [برای مطالعه بیشتر](https://l.vrgl.ir/r?l=https%3A%2F%2Fcolah.github.io%2Fposts%2F2015-08-Understanding-LSTMs%2F&st=post&si=rynq4emx1qcx&k=qToANxWsJZcbp30NlTE%2FGPXPRobbWIVbY2orsTBmE0E%3D)
## آماده سازی
برای شروع به تنسورفلو و نامپای نیاز خواهیم داشت که میتوانید با دستور زیر آنها را نصب کنید :
>pip install -U tensorflow-gpu
>
>pip install -U numpy

ما از دیوان حافظ استفاده میکنیم اما میتوانید برای دقت بیشتر از اشعار سعدی یا فردوسی استفاده کنید(یا هرنوع متن بالای 100 هزار کارکتر)، اشعار حافظ را با دستور زیر دریافت میکنیم :

`wget -O hafez.txt https://raw.githubusercontent.com/amnghd/Persian_poems_corpus/master/normalized/hafez_norm.txt`

ابزار های مورد نیاز را ایمپورت میکنیم و سپس محتوای کتاب را میخوانیم :

```
import tensorflow as tf
import keras
from keras.layers import  Input, LSTM, Dense
import tensorflow.keras.optimizers as optimizers
import numpy as np
import random

text = open(&quothafez.txt&quot, &quotr&quot, encoding=&quotutf-8&quot).read()
```
## پردازش متن و ایجاد دیتاست

شبکه عصبی نمیتواند داده ها به صورت متنی دریافت کند، برای همین باید کارکتر ها را به اعداد صحیح تبدیل کنیم :
```
chars = sorted(list(set(text)))
char_indices = dict((c, i) for i, c in enumerate(chars))
indices_char = dict((i, c) for i, c in enumerate(chars))
```
برای تولید متن مدل با دیدن کارکتر های قبل یاد میگیرد که کارکتر بعدی کدام است :

