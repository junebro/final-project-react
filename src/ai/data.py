import csv
import mysql.connector

# MySQL 연결 설정
mydb = mysql.connector.connect(
  host="192.168.0.86",
  user="greenlife",
  password="Green%3F123F123",
  database="finalproject"
)

# CSV 파일 경로
csv_file = 'src/ai/음식데이터베이스.csv'

# CSV 파일 열기
with open(csv_file, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # MySQL 테이블에 데이터 입력
    cursor = mydb.cursor()
    for row in reader:
        # 빈 값을 NULL로 처리
        for key in row:
            if row[key] == '-' or row[key] == '':
                row[key] = None
        
        # SQL 쿼리 작성
        sql = "INSERT INTO food (name, serving, calorie, carbohydrate, sugar, protein, fat, saturated_fat, polyunsaturated_fat, monounsaturated_fat, cholesterol, fiber, sodium, potassium) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        
        # CSV 파일에서 읽은 데이터를 튜플 형태로 변환
        values = (
            row['name'],
            row['serving'],
            row['calorie'],
            row['carbohydrate'],
            row['sugar'],
            row['protein'],
            row['fat'],
            row['saturated_fat'],
            row['polyunsaturated_fat'],
            row['monounsaturated_fat'],
            row['cholesterol'],
            row['fiber'],
            row['sodium'],
            row['potassium']
        )
        
        # SQL 쿼리 실행
        cursor.execute(sql, values)
        
    # 변경 사항을 커밋
    mydb.commit()

    # 연결 종료
    cursor.close()
    mydb.close()

print("Data inserted successfully")
