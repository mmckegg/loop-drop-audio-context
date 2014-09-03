module.exports = Input

function Input(audioContext){
  if (!(this instanceof Input)){
    return new Input(audioContext)
  }

  this.context = audioContext
  this.output = audioContext.createGain()
  this.multiplier = this.output.gain

  this._passthru = null

  this._id = null

  if (!audioContext.inputs){
    audioContext.inputs = []
  }
}

Input.prototype = {
  
  constructor: Input,

  get id(){
    return this._id
  },

  set id(value){
    if (value !== this._id){
      var input = this.context.inputs[this._id]

      if (this._passthru){
        this._passthru.disconnect()
      }

      this._id = value

      if (this._id != null && !this.context.inputs[this._id]){
        this.context.inputs[this._id] = this.context.createGain()
      }

      this._passthru = this.context.createGain()

      input = this.context.inputs[this._id]
      input.connect(this._passthru)
      this._passthru.connect(this.output)
    }
  },

  connect: function(destination){
    this.output.connect.apply(this.output, arguments)
  },

  disconnect: function(){
    this.output.disconnect.apply(this.output, arguments)
  }
}