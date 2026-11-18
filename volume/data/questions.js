window.QUIZ_DATA = {
 "days": {
  "1": {
   "title": {
    "ar": "هل تثق بعينيك؟ المساحة والحجم في العمارة",
    "en": "Trust your eyes? Area and volume in architecture"
   },
   "questions": [
    {
     "id": "V-Q01",
     "level": "easy",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "الكابينة أ أبعادها 10 × 10 × 10 م، والكابينة ب أبعادها 20 × 10 × 5 م. أي العبارات صحيحة؟",
      "options": {
       "A": "ب تتسع لمساحة أكبر",
       "B": "الحجم نفسه والتكسية نفسها",
       "C": "الحجم نفسه، لكن ب تحتاج تكسية أكثر",
       "D": "أ تحتاج تكسية أكثر"
      },
      "reason": "كلتاهما 1,000 م³. مساحة غلاف أ 600 م² وغلاف ب 700 م²: الحجم نفسه بتكسية أكثر بـ 17% وكسب حراري أكبر."
     },
     "en": {
      "question": "Cabin A is 10 × 10 × 10 m. Cabin B is 20 × 10 × 5 m. Which statement is true?",
      "options": {
       "A": "B holds more space",
       "B": "Same space, same cladding",
       "C": "Same space, but B needs more cladding",
       "D": "A needs more cladding"
      },
      "reason": "Both hold 1,000 m³. A's skin is 600 m², B's is 700 m²: the same space costs 17% more cladding and gains more heat."
     },
     "fig": "cabins"
    },
    {
     "id": "V-Q02",
     "level": "easy",
     "section": "1",
     "answer": "B",
     "trap": "A",
     "ar": {
      "question": "ضاعفت كل أبعاد غرفة. ماذا يحدث لمساحة أرضيتها؟",
      "options": {
       "A": "×2",
       "B": "×4",
       "C": "×6",
       "D": "×8"
      },
      "reason": "المساحة تعتمد على بُعدين: 2 × 2 = 4. والحجم يعتمد على ثلاثة: 2 × 2 × 2 = 8."
     },
     "en": {
      "question": "You double every length of a room. What happens to its floor area?",
      "options": {
       "A": "×2",
       "B": "×4",
       "C": "×6",
       "D": "×8"
      },
      "reason": "Area depends on two lengths: 2 × 2 = 4. Volume depends on three: 2 × 2 × 2 = 8."
     }
    },
    {
     "id": "V-Q03",
     "level": "easy",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "الخزان أ أسطواني بقطر 9 م وارتفاع 8 م. الخزان ب صندوق 10 × 3 × 16 م. أيهما يتسع لماء أكثر؟",
      "options": {
       "A": "أ، الأسطوانة العريضة",
       "B": "ب، الصندوق الطويل",
       "C": "يتسعان للكمية نفسها",
       "D": "لا يمكن المعرفة دون ملئهما"
      },
      "reason": "أ: π × 4.5² × 8 ≈ 509 م³. ب: 10 × 3 × 16 = 480 م³. الارتفاع يخدع العين، والعرض يُحسب مرتين."
     },
     "en": {
      "question": "Tank A: cylinder, 9 m wide, 8 m high. Tank B: box, 10 × 3 × 16 m. Which holds more water?",
      "options": {
       "A": "A, the wide cylinder",
       "B": "B, the tall box",
       "C": "They hold the same",
       "D": "You cannot tell without filling them"
      },
      "reason": "A: π × 4.5² × 8 ≈ 509 m³. B: 10 × 3 × 16 = 480 m³. Height fools the eye; width counts twice."
     },
     "fig": "tanks"
    },
    {
     "id": "V-Q04",
     "level": "medium",
     "section": "1",
     "answer": "B",
     "trap": "A",
     "ar": {
      "question": "قاعة بسقف جملوني: عرض الجدران 11 م وارتفاعها 14 م، ومثلث السقف بارتفاع 5 م، والطول 15 م. ما حجمها؟",
      "options": {
       "A": "2,310 م³",
       "B": "2,722.5 م³",
       "C": "3,135 م³",
       "D": "2,475 م³"
      },
      "reason": "القاعدة = 11 × 14 + ½ × 11 × 5 = 181.5 م². الحجم = 181.5 × 15 = 2,722.5 م³. نسيان ½ يعطي 3,135."
     },
     "en": {
      "question": "A gabled hall: walls 11 m wide and 14 m high, roof triangle 5 m high, length 15 m. What is its volume?",
      "options": {
       "A": "2,310 m³",
       "B": "2,722.5 m³",
       "C": "3,135 m³",
       "D": "2,475 m³"
      },
      "reason": "Base = 11 × 14 + ½ × 11 × 5 = 181.5 m². Volume = 181.5 × 15 = 2,722.5 m³. Forgetting the ½ gives 3,135."
     },
     "fig": "gable"
    },
    {
     "id": "V-Q05",
     "level": "medium",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "عمود دائري قطره 1.5 م وعمود مربع 1.5 × 1.5 م، وارتفاع كل منهما 3 م. كم يوفر الدائري من الخرسانة؟",
      "options": {
       "A": "تقريبًا لا شيء",
       "B": "نحو 10%",
       "C": "نحو 21%",
       "D": "نحو 50%"
      },
      "reason": "المربع: 6.75 م³. الدائري: π × 0.75² × 3 ≈ 5.3 م³. الدائرة تملأ π/4 ≈ 79% فقط من مربعها."
     },
     "en": {
      "question": "A round column 1.5 m across and a square column 1.5 × 1.5 m, both 3 m high. How much less concrete does the round one use?",
      "options": {
       "A": "Almost the same",
       "B": "About 10% less",
       "C": "About 21% less",
       "D": "About 50% less"
      },
      "reason": "Square: 6.75 m³. Round: π × 0.75² × 3 ≈ 5.3 m³. A circle fills only π/4 ≈ 79% of its square."
     },
     "fig": "columns"
    },
    {
     "id": "V-Q06",
     "level": "medium",
     "section": "1",
     "answer": "A",
     "trap": "C",
     "ar": {
      "question": "برج قطره 14 م وفي وسطه فراغ قطره 4.5 م. ما نسبة حجم الفراغ من حجم البرج؟",
      "options": {
       "A": "نحو 10%",
       "B": "نحو 20%",
       "C": "نحو الثلث",
       "D": "نحو النصف"
      },
      "reason": "(4.5 ÷ 14)² ≈ 0.10. يبدو الفراغ ثلث العرض، لكن المساحة تنمو بمربع القطر."
     },
     "en": {
      "question": "The tower is 14 m across with a 4.5 m hollow core. What share of the tower's volume is the core?",
      "options": {
       "A": "About 10%",
       "B": "About 20%",
       "C": "About a third",
       "D": "About half"
      },
      "reason": "(4.5 ÷ 14)² ≈ 0.10. The core looks like a third of the width, but area grows with the square."
     },
     "fig": "tower"
    },
    {
     "id": "V-Q07",
     "level": "medium",
     "section": "1",
     "answer": "B",
     "trap": "C",
     "ar": {
      "question": "قاعة بسقف مقبّب: صندوق عرضه 6 م وطوله 12 م وارتفاعه 5 م، وفوقه نصف أسطوانة نصف قطرها 3 م. ما حجمها؟",
      "options": {
       "A": "360 م³",
       "B": "529.6 م³",
       "C": "699.2 م³",
       "D": "586.1 م³"
      },
      "reason": "الصندوق 6 × 12 × 5 = 360 م³. نصف الأسطوانة ½ × π × 3² × 12 ≈ 169.6 م³. المجموع 529.6 م³. الأسطوانة الكاملة تعطي 699.2."
     },
     "en": {
      "question": "A vaulted hall: box 6 m wide, 12 m long, 5 m high, with a half-cylinder roof of radius 3 m. What is its volume?",
      "options": {
       "A": "360 m³",
       "B": "529.6 m³",
       "C": "699.2 m³",
       "D": "586.1 m³"
      },
      "reason": "Box 6 × 12 × 5 = 360 m³. Half cylinder ½ × π × 3² × 12 ≈ 169.6 m³. Total 529.6 m³. A full cylinder gives 699.2."
     },
     "fig": "vault"
    },
    {
     "id": "V-Q08",
     "level": "medium",
     "section": "1",
     "answer": "A",
     "trap": "C",
     "ar": {
      "question": "القاعة نفسها. كم مترًا مربعًا من التكسية تغطي جدرانها وسقفها (دون الأرضية)؟",
      "options": {
       "A": "321.4 م²",
       "B": "393.4 م²",
       "C": "537.4 م²",
       "D": "465.4 م²"
      },
      "reason": "الجدران 180 + طرفا القبو 28.3 + السقف المنحني 113.1 = 321.4 م². جمع المساحتين الكاملتين يعطي 537.4: السطح المخفي 72 م² يُحسب مرتين، ومعه الأرضية."
     },
     "en": {
      "question": "Same vaulted hall. How many m² of cladding cover its walls and roof (no floor)?",
      "options": {
       "A": "321.4 m²",
       "B": "393.4 m²",
       "C": "537.4 m²",
       "D": "465.4 m²"
      },
      "reason": "Walls 180 + vault ends 28.3 + curved roof 113.1 = 321.4 m². Adding both solids' full areas gives 537.4: the hidden 72 m² seam is counted twice, plus the floor."
     },
     "fig": "vault"
    },
    {
     "id": "V-Q09",
     "level": "hard",
     "section": "1",
     "answer": "D",
     "trap": "A",
     "ar": {
      "question": "اقطع السقف المخروطي عند منتصف ارتفاعه. ما نسبة الحجم في النصف العلوي؟",
      "options": {
       "A": "½",
       "B": "⅓",
       "C": "¼",
       "D": "⅛"
      },
      "reason": "النصف العلوي مخروط بنصف الأبعاد: ½ × ½ × ½ = ⅛ (11.8 من 94.2 م³). والنصف السفلي يحوي ⅞."
     },
     "en": {
      "question": "Cut the conical roof halfway up its height. What fraction of the roof's volume is in the top half?",
      "options": {
       "A": "½",
       "B": "⅓",
       "C": "¼",
       "D": "⅛"
      },
      "reason": "The top half is a cone at half the size: ½ × ½ × ½ = ⅛ (11.8 of 94.2 m³). The bottom half holds ⅞."
     },
     "fig": "cone"
    },
    {
     "id": "V-Q10",
     "level": "hard",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "صومعة: أسطوانة نصف قطرها 3 م وارتفاعها 10 م، فوقها مخروط ارتفاعه 4 م. ما حجمها؟",
      "options": {
       "A": "320.4 م³",
       "B": "395.8 م³",
       "C": "282.7 م³",
       "D": "339.3 م³"
      },
      "reason": "الأسطوانة π × 3² × 10 ≈ 282.7. المخروط ⅓ × π × 3² × 4 ≈ 37.7. المجموع 320.4 م³. نسيان ⅓ يعطي 395.8."
     },
     "en": {
      "question": "A silo: cylinder of radius 3 m and height 10 m, topped by a cone 4 m high. What is its volume?",
      "options": {
       "A": "320.4 m³",
       "B": "395.8 m³",
       "C": "282.7 m³",
       "D": "339.3 m³"
      },
      "reason": "Cylinder π × 3² × 10 ≈ 282.7. Cone ⅓ × π × 3² × 4 ≈ 37.7. Total 320.4 m³. Forgetting the ⅓ gives 395.8."
     },
     "fig": "silo"
    },
    {
     "id": "V-Q11",
     "level": "hard",
     "section": "1",
     "answer": "C",
     "trap": "B",
     "ar": {
      "question": "الصومعة نفسها. كم من الصفائح الفولاذية يغطي الجدار والغطاء المخروطي (دون الأرضية)؟",
      "options": {
       "A": "226.2 م²",
       "B": "263.9 م²",
       "C": "235.6 م²",
       "D": "254.5 م²"
      },
      "reason": "الجدار 2π × 3 × 10 ≈ 188.5. المخروط يستخدم الارتفاع المائل √(3² + 4²) = 5: π × 3 × 5 ≈ 47.1. المجموع 235.6 م². استخدام 4 بدل 5 يعطي 226.2."
     },
     "en": {
      "question": "Same silo. How much steel sheet covers the wall and the cone cap (no floor)?",
      "options": {
       "A": "226.2 m²",
       "B": "263.9 m²",
       "C": "235.6 m²",
       "D": "254.5 m²"
      },
      "reason": "Wall 2π × 3 × 10 ≈ 188.5. Cone uses the slant height √(3² + 4²) = 5: π × 3 × 5 ≈ 47.1. Total 235.6 m². Using 4 instead of 5 gives 226.2."
     },
     "fig": "silo"
    },
    {
     "id": "V-Q12",
     "level": "hard",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "مكعب ضلعه 10 م وبرج 5 × 5 × 40 م، وحجم كل منهما 1,000 م³. كم يزيد غلاف البرج (الجدران والسقف)؟",
      "options": {
       "A": "نحو 17%",
       "B": "نحو 40%",
       "C": "نحو 65%",
       "D": "نحو 100%"
      },
      "reason": "المكعب: 4 × 100 + 100 = 500 م². البرج: 4 × 200 + 25 = 825 م². أي غلاف أكبر بـ 65% للتكسية والتبريد."
     },
     "en": {
      "question": "A 10 m cube and a 5 × 5 × 40 m tower both hold 1,000 m³. How much more envelope (walls + roof) does the tower need?",
      "options": {
       "A": "About 17%",
       "B": "About 40%",
       "C": "About 65%",
       "D": "About 100%"
      },
      "reason": "Cube: 4 × 100 + 100 = 500 m². Tower: 4 × 200 + 25 = 825 m². That is 65% more skin to clad and to cool."
     },
     "fig": "cubetower"
    },
    {
     "id": "V-Q13",
     "level": "hard",
     "section": "1",
     "answer": "C",
     "trap": "B",
     "ar": {
      "question": "مجسم لجناح بمقياس 1:10 استُخدم فيه 0.5 م³ من الفوم. ما حجم الجناح الحقيقي؟",
      "options": {
       "A": "5 م³",
       "B": "50 م³",
       "C": "500 م³",
       "D": "5,000 م³"
      },
      "reason": "الأطوال ×10 تعني الحجم ×10 × 10 × 10 = ×1,000. إذن 0.5 × 1,000 = 500 م³."
     },
     "en": {
      "question": "A 1:10 scale model of a pavilion uses 0.5 m³ of foam. How much space does the real pavilion enclose?",
      "options": {
       "A": "5 m³",
       "B": "50 m³",
       "C": "500 m³",
       "D": "5,000 m³"
      },
      "reason": "Lengths ×10 means volume ×10 × 10 × 10 = ×1,000. So 0.5 × 1,000 = 500 m³."
     }
    },
    {
     "id": "V-Q14",
     "level": "easy",
     "section": "1",
     "answer": "A",
     "trap": "D",
     "ar": {
      "question": "مسقط أفقي على شكل L: مستطيل 12 × 8 م اقتُطع من زاويته 4 × 3 م. ما مساحة الأرضية؟",
      "options": {
       "A": "84 م²",
       "B": "96 م²",
       "C": "72 م²",
       "D": "108 م²"
      },
      "reason": "12 × 8 = 96، ناقص الجزء المقتطع 4 × 3 = 12، يساوي 84 م². الجمع بدل الطرح يعطي 108."
     },
     "en": {
      "question": "An L-shaped floor plan is a 12 × 8 m rectangle with a 4 × 3 m corner cut out. What is its floor area?",
      "options": {
       "A": "84 m²",
       "B": "96 m²",
       "C": "72 m²",
       "D": "108 m²"
      },
      "reason": "12 × 8 = 96, minus the cut-out 4 × 3 = 12, gives 84 m². Adding instead of subtracting gives 108."
     }
    },
    {
     "id": "V-Q15",
     "level": "easy",
     "section": "1",
     "answer": "B",
     "trap": "D",
     "ar": {
      "question": "جدار جملوني مثلثي قاعدته 8 م وارتفاعه 3 م. ما مساحة الجدار المطلوب لياسته؟",
      "options": {
       "A": "24 م²",
       "B": "12 م²",
       "C": "11 م²",
       "D": "6 م²"
      },
      "reason": "مساحة المثلث = ½ × القاعدة × الارتفاع = ½ × 8 × 3 = 12 م². نسيان ½ يعطي 24."
     },
     "en": {
      "question": "A triangular gable wall has a base of 8 m and a height of 3 m. How much wall area is there to plaster?",
      "options": {
       "A": "24 m²",
       "B": "12 m²",
       "C": "11 m²",
       "D": "6 m²"
      },
      "reason": "Triangle area = ½ × base × height = ½ × 8 × 3 = 12 m². Forgetting the ½ gives 24."
     }
    },
    {
     "id": "V-Q16",
     "level": "easy",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "ساحة دائرية قطرها 20 م. كم مترًا مربعًا من البلاط تحتاج؟",
      "options": {
       "A": "62.8 م²",
       "B": "1,256.6 م²",
       "C": "314.2 م²",
       "D": "157.1 م²"
      },
      "reason": "نصف القطر 10 م. المساحة = π × 10² ≈ 314.2 م². الرقم 62.8 هو المحيط، و1,256.6 يستخدم القطر بدل نصف القطر."
     },
     "en": {
      "question": "A circular plaza is 20 m in diameter. How many m² of paving does it need?",
      "options": {
       "A": "62.8 m²",
       "B": "1,256.6 m²",
       "C": "314.2 m²",
       "D": "157.1 m²"
      },
      "reason": "Radius = 10 m. Area = π × 10² ≈ 314.2 m². 62.8 is the circumference; 1,256.6 uses the diameter as the radius."
     }
    },
    {
     "id": "V-Q17",
     "level": "easy",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "جناح سداسي مسقطه مضلع منتظم بستة أضلاع. كم قياس كل زاوية داخلية؟",
      "options": {
       "A": "120°",
       "B": "108°",
       "C": "135°",
       "D": "60°"
      },
      "reason": "مجموع الزوايا = (6 − 2) × 180 = 720°. كل زاوية = 720 ÷ 6 = 120°."
     },
     "en": {
      "question": "A hexagonal pavilion has a regular six-sided plan. What is each interior angle?",
      "options": {
       "A": "120°",
       "B": "108°",
       "C": "135°",
       "D": "60°"
      },
      "reason": "Sum of angles = (6 − 2) × 180 = 720°. Each angle = 720 ÷ 6 = 120°."
     }
    },
    {
     "id": "V-Q18",
     "level": "easy",
     "section": "1",
     "answer": "D",
     "trap": "B",
     "ar": {
      "question": "غرفة 5 × 4 م وارتفاعها 3 م. ما مساحة الجدران المطلوب دهانها (دون السقف، وبإهمال الفتحات)؟",
      "options": {
       "A": "74 م²",
       "B": "60 م²",
       "C": "27 م²",
       "D": "54 م²"
      },
      "reason": "المحيط 2 × (5 + 4) = 18 م. الجدران = 18 × 3 = 54 م². إضافة السقف 20 م² تعطي 74."
     },
     "en": {
      "question": "A room is 5 × 4 m and 3 m high. How much wall area needs paint (no ceiling, ignore openings)?",
      "options": {
       "A": "74 m²",
       "B": "60 m²",
       "C": "27 m²",
       "D": "54 m²"
      },
      "reason": "Perimeter 2 × (5 + 4) = 18 m. Walls = 18 × 3 = 54 m². Adding the 20 m² ceiling gives 74."
     }
    },
    {
     "id": "V-Q19",
     "level": "medium",
     "section": "1",
     "answer": "B",
     "trap": "C",
     "ar": {
      "question": "نافذة مستطيلة عرضها 1.2 م وارتفاعها 1.5 م، يعلوها نصف دائرة. ما مساحة الزجاج؟",
      "options": {
       "A": "1.80 م²",
       "B": "2.37 م²",
       "C": "2.93 م²",
       "D": "2.16 م²"
      },
      "reason": "المستطيل 1.2 × 1.5 = 1.80. نصف الدائرة ½ × π × 0.6² ≈ 0.57. المجموع ≈ 2.37 م². الدائرة الكاملة تعطي 2.93."
     },
     "en": {
      "question": "A window is a 1.2 m wide × 1.5 m tall rectangle with a semicircle on top. What is its glass area?",
      "options": {
       "A": "1.80 m²",
       "B": "2.37 m²",
       "C": "2.93 m²",
       "D": "2.16 m²"
      },
      "reason": "Rectangle 1.2 × 1.5 = 1.80. Semicircle ½ × π × 0.6² ≈ 0.57. Total ≈ 2.37 m². A full circle gives 2.93."
     }
    },
    {
     "id": "V-Q20",
     "level": "medium",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "منحدر لذوي الإعاقة يرتفع 1 م على مسافة أفقية 12 م. ما طول سطح المنحدر؟",
      "options": {
       "A": "12 م",
       "B": "13 م",
       "C": "12.04 م",
       "D": "12.5 م"
      },
      "reason": "فيثاغورس: √(12² + 1²) = √145 ≈ 12.04 م. أطول من المسافة الأفقية بقليل فقط."
     },
     "en": {
      "question": "An accessible ramp rises 1 m over a horizontal run of 12 m. How long is the ramp surface?",
      "options": {
       "A": "12 m",
       "B": "13 m",
       "C": "12.04 m",
       "D": "12.5 m"
      },
      "reason": "Pythagoras: √(12² + 1²) = √145 ≈ 12.04 m. It is longer than the run, but only a little."
     }
    },
    {
     "id": "V-Q21",
     "level": "medium",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "أرض 30 × 20 م في وسطها مبنى 20 × 10 م. ما مساحة الفناء المكشوف حوله؟",
      "options": {
       "A": "400 م²",
       "B": "200 م²",
       "C": "500 م²",
       "D": "350 م²"
      },
      "reason": "الأرض 600 م² ناقص المبنى 200 م² = 400 م². الفناء ضعف مساحة المبنى."
     },
     "en": {
      "question": "A 30 × 20 m site has a 20 × 10 m building in its centre. What is the area of the open courtyard around it?",
      "options": {
       "A": "400 m²",
       "B": "200 m²",
       "C": "500 m²",
       "D": "350 m²"
      },
      "reason": "Site 600 m² minus building 200 m² = 400 m². The courtyard is twice the building's footprint."
     }
    },
    {
     "id": "V-Q22",
     "level": "medium",
     "section": "1",
     "answer": "D",
     "trap": "B",
     "ar": {
      "question": "قاعة اجتماعات مستطيلة 10 × 4 م، وفي كل طرف قصير نصف دائرة. ما مساحة أرضيتها؟",
      "options": {
       "A": "40.0 م²",
       "B": "46.3 م²",
       "C": "77.7 م²",
       "D": "52.6 م²"
      },
      "reason": "نصفا دائرة نصف قطرهما 2 م يكوّنان دائرة كاملة: π × 2² ≈ 12.6. المجموع 40 + 12.6 ≈ 52.6 م²."
     },
     "en": {
      "question": "A meeting room is a 10 × 4 m rectangle with a semicircle at each short end. What is its floor area?",
      "options": {
       "A": "40.0 m²",
       "B": "46.3 m²",
       "C": "77.7 m²",
       "D": "52.6 m²"
      },
      "reason": "Two semicircles of radius 2 m make one circle: π × 2² ≈ 12.6. Total 40 + 12.6 ≈ 52.6 m²."
     }
    },
    {
     "id": "V-Q23",
     "level": "medium",
     "section": "1",
     "answer": "B",
     "trap": "D",
     "ar": {
      "question": "بلاطة أرضية 10 × 8 م وسمكها 0.2 م. كم يلزمها من الخرسانة؟",
      "options": {
       "A": "160 م³",
       "B": "16 م³",
       "C": "1.6 م³",
       "D": "80 م³"
      },
      "reason": "10 × 8 × 0.2 = 16 م³. عدم تحويل 20 سم إلى 0.2 م يعطي أرقامًا خاطئة مثل 160."
     },
     "en": {
      "question": "A 10 × 8 m floor slab is 0.2 m thick. How much concrete is needed?",
      "options": {
       "A": "160 m³",
       "B": "16 m³",
       "C": "1.6 m³",
       "D": "80 m³"
      },
      "reason": "10 × 8 × 0.2 = 16 m³. Forgetting to convert 20 cm to 0.2 m gives 1,600 or 160."
     }
    },
    {
     "id": "V-Q24",
     "level": "hard",
     "section": "1",
     "answer": "C",
     "trap": "A",
     "ar": {
      "question": "غرفة 6 × 5 م وارتفاعها 3 م، وتحتاج 6 تغييرات هواء في الساعة. كم من الهواء النقي يجب أن يوفر المكيف؟",
      "options": {
       "A": "90 م³/س",
       "B": "180 م³/س",
       "C": "540 م³/س",
       "D": "1,080 م³/س"
      },
      "reason": "الحجم 6 × 5 × 3 = 90 م³. تدفق الهواء = 6 × 90 = 540 م³/س. الحجم يحدد حجم المراوح والمجاري."
     },
     "en": {
      "question": "A room is 6 × 5 m and 3 m high. It needs 6 air changes per hour. How much fresh air must the AC deliver?",
      "options": {
       "A": "90 m³/h",
       "B": "180 m³/h",
       "C": "540 m³/h",
       "D": "1,080 m³/h"
      },
      "reason": "Volume 6 × 5 × 3 = 90 m³. Airflow = 6 × 90 = 540 m³/h. Volume decides the size of the fans and ducts."
     }
    },
    {
     "id": "V-Q25",
     "level": "hard",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "تضاعفت مساحة جدار، وبقيت مادته (قيمة U) وفرق درجات الحرارة كما هي. ماذا يحدث للحرارة المنتقلة عبره؟",
      "options": {
       "A": "×2",
       "B": "×4",
       "C": "لا تتغير",
       "D": "×8"
      },
      "reason": "Q = U × A × ΔT. تتغير A فقط، فتتضاعف الحرارة. كل متر مربع إضافي من الغلاف حمل تبريد إضافي."
     },
     "en": {
      "question": "A wall's area doubles. Its material (U-value) and the temperature difference stay the same. What happens to the heat flowing through it?",
      "options": {
       "A": "×2",
       "B": "×4",
       "C": "No change",
       "D": "×8"
      },
      "reason": "Q = U × A × ΔT. Only A changes, so the heat flow doubles. Every extra m² of skin is extra cooling load."
     }
    },
    {
     "id": "V-Q26",
     "level": "hard",
     "section": "1",
     "answer": "D",
     "trap": "A",
     "ar": {
      "question": "برج زجاجي له 4 واجهات، عرض كل منها 20 م وارتفاعها 60 م، و40% من الواجهات زجاج. كم مساحة الزجاج؟",
      "options": {
       "A": "4,800 م²",
       "B": "480 م²",
       "C": "2,880 م²",
       "D": "1,920 م²"
      },
      "reason": "الواجهات = 4 × 20 × 60 = 4,800 م². الزجاج = 0.4 × 4,800 = 1,920 م². الرقم 4,800 ينسى نسبة 40%."
     },
     "en": {
      "question": "A glass tower has 4 facades, each 20 m wide and 60 m tall. 40% of the facade is glass. How much glass is there?",
      "options": {
       "A": "4,800 m²",
       "B": "480 m²",
       "C": "2,880 m²",
       "D": "1,920 m²"
      },
      "reason": "Facade = 4 × 20 × 60 = 4,800 m². Glass = 0.4 × 4,800 = 1,920 m². 4,800 forgets the 40%."
     }
    },
    {
     "id": "V-Q27",
     "level": "hard",
     "section": "1",
     "answer": "B",
     "trap": "A",
     "ar": {
      "question": "كوة سقفية هرمية قاعدتها مربع 4 × 4 م وارتفاعها 3 م. ما حجم الهواء داخلها؟",
      "options": {
       "A": "48 م³",
       "B": "16 م³",
       "C": "24 م³",
       "D": "12 م³"
      },
      "reason": "الحجم = ⅓ × القاعدة × الارتفاع = ⅓ × 16 × 3 = 16 م³. نسيان ⅓ يعطي 48."
     },
     "en": {
      "question": "A pyramid skylight has a 4 × 4 m square base and is 3 m high. What volume of air is inside it?",
      "options": {
       "A": "48 m³",
       "B": "16 m³",
       "C": "24 m³",
       "D": "12 m³"
      },
      "reason": "V = ⅓ × base × height = ⅓ × 16 × 3 = 16 m³. Forgetting the ⅓ gives 48."
     }
    },
    {
     "id": "V-Q28",
     "level": "hard",
     "section": "1",
     "answer": "C",
     "trap": "B",
     "ar": {
      "question": "قبة على شكل نصف كرة نصف قطرها 10 م. ما مساحة التغطية لسطحها المنحني؟",
      "options": {
       "A": "314.2 م²",
       "B": "1,256.6 م²",
       "C": "628.3 م²",
       "D": "942.5 م²"
      },
      "reason": "مساحة الكرة 4πr²، فالسطح المنحني لنصفها = 2πr² = 2 × π × 100 ≈ 628.3 م². الرقم 1,256.6 للكرة كاملة."
     },
     "en": {
      "question": "A dome is a hemisphere of radius 10 m. How much roof covering does its curved surface need?",
      "options": {
       "A": "314.2 m²",
       "B": "1,256.6 m²",
       "C": "628.3 m²",
       "D": "942.5 m²"
      },
      "reason": "Sphere = 4πr², so a hemisphere's curved surface = 2πr² = 2 × π × 100 ≈ 628.3 m². 1,256.6 is the whole sphere."
     }
    },
    {
     "id": "V-Q29",
     "level": "hard",
     "section": "1",
     "answer": "A",
     "trap": "B",
     "ar": {
      "question": "قاعة بقبة على شكل نصف كرة نصف قطرها 6 م. ما حجم الهواء الذي يجب أن يبرده المكيف تحت القبة؟",
      "options": {
       "A": "452.4 م³",
       "B": "904.8 م³",
       "C": "226.2 م³",
       "D": "678.6 م³"
      },
      "reason": "حجم نصف الكرة = ⅔ × π × r³ = ⅔ × π × 216 ≈ 452.4 م³. الرقم 904.8 للكرة كاملة."
     },
     "en": {
      "question": "A domed hall is a hemisphere of radius 6 m. What volume of air does the AC have to cool under the dome?",
      "options": {
       "A": "452.4 m³",
       "B": "904.8 m³",
       "C": "226.2 m³",
       "D": "678.6 m³"
      },
      "reason": "Hemisphere V = ⅔ × π × r³ = ⅔ × π × 216 ≈ 452.4 m³. 904.8 is the whole sphere."
     }
    },
    {
     "id": "V-Q30",
     "level": "hard",
     "section": "1",
     "answer": "B",
     "trap": "A",
     "ar": {
      "question": "مسقط على شكل مخمس منتظم: ما مجموع زواياه الداخلية؟",
      "options": {
       "A": "360°",
       "B": "540°",
       "C": "720°",
       "D": "450°"
      },
      "reason": "المجموع = (n − 2) × 180 = 3 × 180 = 540°. الرقم 360° لأي شكل رباعي."
     },
     "en": {
      "question": "Regular pentagon plan: what is the sum of its interior angles?",
      "options": {
       "A": "360°",
       "B": "540°",
       "C": "720°",
       "D": "450°"
      },
      "reason": "Sum = (n − 2) × 180 = 3 × 180 = 540°. 360° is the sum for any quadrilateral."
     }
    }
   ]
  }
 }
};
