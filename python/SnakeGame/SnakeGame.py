import turtle
import time
import random

# 设置窗口
win = turtle.Screen()
win.title("贪吃蛇游戏")
win.bgcolor("black")
win.setup(width=600, height=600)
win.tracer(0)  # 关闭自动刷新

# 蛇头
head = turtle.Turtle()
head.speed(0)
head.shape("square")
head.color("white")
head.penup()
head.goto(0, 0)
head.direction = "Right"

# 食物
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color("red")
food.penup()
food.goto(random.randint(-290, 290), random.randint(-290, 290))

# 蛇身列表
segments = []

# 移动函数
def move():
    if head.direction == "Up":
        y = head.ycor()
        head.sety(y + 20)

    elif head.direction == "Down":
        y = head.ycor()
        head.sety(y - 20)

    elif head.direction == "Left":
        x = head.xcor()
        head.setx(x - 20)

    elif head.direction == "Right":
        x = head.xcor()
        head.setx(x + 20)

# 方向控制函数
def go_up():
    if head.direction != "Down":
        head.direction = "Up"

def go_down():
    if head.direction != "Up":
        head.direction = "Down"

def go_left():
    if head.direction != "Right":
        head.direction = "Left"

def go_right():
    if head.direction != "Left":
        head.direction = "Right"

# 键盘绑定
win.listen()
win.onkey(go_up, "Up")
win.onkey(go_down, "Down")
win.onkey(go_left, "Left")
win.onkey(go_right, "Right")

# 游戏主循环
while True:
    win.update()

    # 判断是否吃到食物
    if head.distance(food) < 20:
        # 移动食物到新的位置
        food.goto(random.randint(-290, 290), random.randint(-290, 290))

        # 增加蛇身
        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("square")
        new_segment.color("grey")
        new_segment.penup()
        segments.append(new_segment)

    # 移动蛇身
    for i in range(len(segments) - 1, 0, -1):
        x = segments[i - 1].xcor()
        y = segments[i - 1].ycor()
        segments[i].goto(x, y)

    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)

    # 移动蛇头
    move()

    # 判断是否撞到墙或自身
    if head.xcor() > 290 or head.xcor() < -290 or head.ycor() > 290 or head.ycor() < -290:
        print("游戏结束")
        time.sleep(1)
        win.bye()

    for segment in segments:
        if head.distance(segment) < 20:
            print("游戏结束")
            time.sleep(1)
            win.bye()

    # 刷新频率
    time.sleep(0.1)
