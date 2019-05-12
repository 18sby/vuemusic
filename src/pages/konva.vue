<template>
  <div class="container_box">
    <van-button @click="handleSave" type="primary" size="small">Save Image</van-button>
    <van-button @click="startImg" type="info" size="small">Create Img</van-button>
    <van-button @click="fillText = true" type="warning" size="small">Create Text</van-button>
    <van-cell-group v-show="fillText">
      <van-field
        v-model="inp_text.text"
        label="文字"
        type="textarea"
        placeholder="请输入文字"
        rows="1"
        autosize
        clearable
      />
      <van-field
        v-model="inp_text.size"
        label="字号"
        type="textarea"
        placeholder="请输入字号"
        rows="1"
        autosize
        clearable
      />
      <van-button @click="confirmText" type="primary" size="large">确定</van-button>
    </van-cell-group>
    <van-cell-group v-show="fillImage">
      <van-field
        v-model="inp_image.src"
        label="图片src"
        type="textarea"
        placeholder="请输入图片src"
        rows="1"
        autosize
        clearable
      />
      <van-field
        v-model="inp_image.width"
        label="图片宽度"
        value="Number"
        type="textarea"
        placeholder="请输入图片宽度"
        rows="1"
        autosize
        clearable
      />
      <van-field
        v-model="inp_image.height"
        label="图片高度"
        value="Number"
        type="textarea"
        placeholder="请输入图片高度"
        rows="1"
        autosize
        clearable
      />
      <van-button @click="confirmImg" type="primary" size="large">确定</van-button>
    </van-cell-group>
    <div id="container"></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  data () {
    return {
      height: 0,
      width: 0,
      fillText: false,
      fillImage: false,
      inp_text: {
        text: '',
        size: ''
      },
      inp_image: {
        src: '',
        x: 0,
        y: 0,
        width: '',
        height: ''
      },
      stage: [],
      layer: [],
      img1: require('@/assets/img/b1.jpg'),
      img2: require('@/assets/img/b2.jpg'),
      img3: require('@/assets/img/b3.jpg'),
      default: require('@/assets/img/share.jpeg'),
    }
  },
  async mounted () {
    await this.createStage()
    // 分享底图
    this.createImg({
      src: this.default, 
      x: 0, 
      y: 0, 
      width: this.width, 
      height: this.height
    })
  },
  methods: {
    // stage
    createStage () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.width = width
      this.height = height
      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      });
      var layer = new Konva.Layer();
      this.stage = stage
      this.layer = layer
    },
    // 下载当前图片
    downloadURI (uri, name) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Vue.delete(link);
    },
    // 生成保存图片
    handleSave () {
      let stage = this.stage
      var dataURL = stage.toDataURL();
      this.downloadURI(dataURL, 'stage.png');
    },
    // 创建文字
    createText (inp_text) {
      let stage = this.stage
      let layer = this.layer
      var text1 = new Konva.Text({
        x: 0,
        y: 0,
        fontSize: inp_text.size,
        text: inp_text.text,
        draggable: true
      });
      layer.add(text1);
      stage.add(layer);
    },
    confirmText () {
      this.createText(this.inp_text)
      this.fillText = false
      for (let arg in this.inp_text) {
        this.inp_text[arg] = ''
      }
    },
    confirmImg () {
      this.createImg(this.inp_image)
      console.log(this.inp_image)
      this.fillImage = false
    },
    // 创建图片
    createImg (inp_image) {
      let stage = this.stage
      let layer = this.layer
      var imageObj = new Image();
      imageObj.onload = function() {
        var yoda = new Konva.Image({
          x: inp_image.x,
          y: inp_image.y,
          image: imageObj,
          width: inp_image.width,
          height: inp_image.height,
          draggable: true
        });

        // add the shape to the layer
        layer.add(yoda);

        // add the layer to the stage
        stage.add(layer);
      };
      switch (inp_image.src) {
        case '1':
          imageObj.src = this.img1
          break
        case '2':
          imageObj.src = this.img2
          break
        case '3':
          imageObj.src = this.img3
          break
        default :
          imageObj.src = inp_image.src
      }
    },
    // 图片初始化参数
    startImg () {
      for (let arg in this.inp_image) {
        if (arg === 'x' || arg === 'y') {
          this.inp_image[arg] = 0
        } else {
          this.inp_image[arg] = ''
        }
      }
      this.fillImage = true
    },
    // draw image
    drawImage(imageObj) {
      let stage = this.stage
      let layer = this.layer
      // darth vader
      var darthVaderImg = new Konva.Image({
        image: this.img1,
        x: stage.width() / 2 - 200 / 2,
        y: stage.height() / 2 - 137 / 2,
        width: 200,
        height: 137,
        draggable: true
      });

      // add cursor styling
      darthVaderImg.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      darthVaderImg.on('mouseout', function() {
        document.body.style.cursor = 'default';
      });

      layer.add(darthVaderImg);
      stage.add(layer);
    }
  }
}
</script>
<style lang="scss" scoped>

.container_box {
  width: 100%;
  height: 100%;

  #container {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f0f0f0;
  }
}

</style>
