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
    }
   ]
  }
 }
};
