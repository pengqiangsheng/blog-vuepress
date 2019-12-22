# matlab 完整代码
```matlab
****************光栅生成*********************
clc;close all;clear all;
suffix=0
h=zeros(1,4) % 生成一个长度为4的数组h,储存图形句柄
for k=1:1:4
f=1/32;
    for i=1:512
        for j=1:512
            Img(i,j)=0.5+0.5*cos(2*pi*f*j + pi*suffix/2); % 生成正弦光栅，相位pi/2
        end
    end
    h(k)=figure;imshow(Img,[]); % figure产生一个图形句柄并赋值给h（k），imshow画一个图像在此句柄
    fileName = ['sin',int2str(suffix)] %文件名，使用[]拼接字符串
    print(h(k),'-dpng','-r200',['img\',sprintf('%s',fileName)]) % 保存在相对路径img文件下
    suffix=suffix+1
end
% 关闭图形句柄
% for n=1:1:4
%     close(h(n))
% end
******处理相位*****************
%-------------读入四张背景图片------------
bX1=imread('bg1.bmp');
bX2=imread('bg2.bmp');
bX3=imread('bg3.bmp');
bX4=imread('bg4.bmp');
bI1=imresize(bX1,1,'bilinear');
bI2=imresize(bX2,1,'bilinear');
bI3=imresize(bX3,1,'bilinear');
bI4=imresize(bX4,1,'bilinear');
bI1=double(bI1);
bI2=double(bI2);
bI3=double(bI3);
bI4=double(bI4);
%--------------读入四张物体图片--------------
X1=imread('1.bmp');
X2=imread('2.bmp');
X3=imread('3.bmp');
X4=imread('4.bmp');

I1=imresize(X1,1,'bilinear');
I2=imresize(X2,1,'bilinear');
I3=imresize(X3,1,'bilinear');
I4=imresize(X4,1,'bilinear');

I1=double(I1);
I2=double(I2);
I3=double(I3);
I4=double(I4);
[M,N] = size(I4);
%------------求解包裹相位----------------
wrapped_phase = zeros(M,N);
for j=1:N
    for i=1:M
        wrapped_phase(i,j)=atan2(I4(i,j)-I2(i,j),I1(i,j)-I3(i,j));   
    end
end

original_phase = zeros(M,N);
for j=1:N
    for i=1:M
        original_phase(i,j)=atan2(bI4(i,j)-bI2(i,j),bI1(i,j)-bI3(i,j));   
    end
end
%相位包裹的被调制的条纹和原始条纹计算
figure;
mesh(wrapped_phase);
figure;
mesh(original_phase);
%-----------相位展开还原相位------------------------------------------------
unwrapped_org= unwrap(original_phase,pi,2); % 衬底列解卷
unwrapped_org= unwrap(unwrapped_org,pi);    % 衬底行解卷

unwrapped_phase= unwrap(wrapped_phase,pi,2);    % 物体列解卷
unwrapped_phase= unwrap(unwrapped_phase,pi);    % 物体行解卷

delta = unwrapped_phase-unwrapped_org; % 相位差

figure;
mesh(unwrapped_org);
figure;
mesh(unwrapped_phase);
for i=1:M
    for j=1:N
        if(delta(i,j)>2.75)
            delta(i,j)=0;
        end
         if(delta(i,j)<0)
            delta(i,j)=0;
        end
    end
end
for i=650:M
    for j=1:N
        delta(i,j)=0;
    end
end
for i=1:50
    for j=1:N
        delta(i,j)=0;
    end
end
for i=1:M
    for j=1:160
        delta(i,j)=0;
    end
end
for i=1:M
    for j=800:N
        delta(i,j)=0;
    end
end
%--------计算高度信息-------------
figure;
mesh(delta);
L=73;
d=19.5;
AC=16*delta/pi;
H = (AC*L/d)./(1+AC/d);reH = H/3.75;
figure(101);set(gcf,'Name','相位解卷3D重建模型','NumberTitle','off');surf(reH);colormap(jet);shading interp;
```