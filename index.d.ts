declare module "sm-crypto" {
  import { BigInteger } from "jsbn";
  interface Point {
    privateKey: string,
    publicKey: string
    k: BigInteger,
    x1: BigInteger
  }
  interface OptionSignature {
    /** 椭圆曲线点 */
    pointPool?: [Point, Point, Point, Point],
    /** der编解码 */
    der?: boolean,
    /** sm3杂凑 */
    hash?: boolean,
    /** sm3杂凑公钥，传入公钥的话，可以去掉sm3杂凑中推导公钥的过程，速度加快 */
    publicKey?: string
  }
  export namespace sm2 {
    /** 获取密钥对 */
    function generateKeyPairHex(): {
      /** 公钥 */
      publicKey: string,
      /** 私钥 */
      privateKey: string
    }
    /**
     * @description 加密
     * @param msgString 明文
     * @param publicKey 公钥
     * @param cipherMode 1 - C1C3C2，0 - C1C2C3，默认为1
     * @returns hex形式的密文
    */
    function doEncrypt(msgString: string, publicKey: string, cipherMode?: 0 | 1): string
    /**
     * @description 解密
     * @param encryptData hex密文
     * @param privateKey 私钥
     * @param cipherMode 1 - C1C3C2，0 - C1C2C3，默认为1
     * @returns 明文
    */
    function doDecrypt(encryptData: string, privateKey: string, cipherMode?: 0 | 1): string
    /**
     * @description 签名
     * @param msg 原文
     * @param privateKey 私钥
     * @param options 其他选项（椭圆曲线点，der编解码，sm3杂凑）
     * @returns hex签名
     */
    function doSignature(msg: string, privateKey: string, options?: OptionSignature): string
    function doVerifySignature(msg: string, sigValueHex: string, publicKey: string, options?: OptionSignature): boolean;
    /** 事先已生成好的椭圆曲线点  */
    function getPoint(): Point;
  }
  /** 杂凑 */
  export function sm3(msg: string): string;
  export namespace sm4 {
    /**
     * @description 加密
     * @param msg 明文（字节数组）
     * @param key 密钥（字节数组）
     * @returns 密文（字节数组）
     */
    function encrypt(msg: number[], key: number[]): number[];
    /**
     * @description 解密
     * @param encryptData 密文（字节数组）
     * @param key 密钥（字节数组）
     * @returns 明文（字节数组）
     */
    function decrypt(encryptData: number[], key: number[]): number[];
  }
}