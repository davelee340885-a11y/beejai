import { useState } from "react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, AlertTriangle } from "lucide-react";
import { getLoginUrl } from "@/const";

interface TermsAcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsAcceptDialog({ open, onOpenChange }: TermsAcceptDialogProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const allAccepted = termsAccepted && privacyAccepted && disclaimerAccepted;

  const handleLogin = () => {
    if (allAccepted) {
      // 儲存用戶已接受條款的狀態到 localStorage
      localStorage.setItem("beejai_terms_accepted", "true");
      localStorage.setItem("beejai_terms_accepted_date", new Date().toISOString());
      // 導向登入頁面
      window.location.href = getLoginUrl();
    }
  };

  const handleClose = () => {
    // 重置所有勾選狀態
    setTermsAccepted(false);
    setPrivacyAccepted(false);
    setDisclaimerAccepted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">歡迎使用 BeeJAI</DialogTitle>
              <DialogDescription>
                登入前請閱讀並同意以下條款
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-6 py-4">
            {/* 重要免責聲明 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">重要免責聲明</h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    本平台提供的所有學校資訊、升學攻略、入學要求、學費資料及其他相關內容，
                    <strong>均僅供一般參考用途</strong>，不構成任何形式的專業升學顧問意見或建議。
                  </p>
                  <p className="text-sm text-red-700 leading-relaxed mt-2">
                    <strong>我們不保證</strong>本平台所載資訊的準確性、完整性、時效性或適用性。
                    用戶根據本平台資訊作出的任何升學決定，<strong>需自行承擔全部風險和責任</strong>。
                  </p>
                </div>
              </div>
            </div>

            {/* 條款勾選區 */}
            <div className="space-y-4">
              {/* 免責聲明 */}
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="disclaimer"
                  checked={disclaimerAccepted}
                  onCheckedChange={(checked) => setDisclaimerAccepted(checked === true)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="disclaimer"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  我已閱讀並理解上述<strong>免責聲明</strong>，明白本平台資訊僅供參考，
                  我將自行向學校核實資訊，並對根據本平台資訊作出的任何決定承擔全部責任。
                </label>
              </div>

              {/* 用戶條款 */}
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  我已閱讀並同意{" "}
                  <Link 
                    href="/terms" 
                    className="text-amber-600 hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FileText className="w-3.5 h-3.5 inline mr-1" />
                    用戶條款
                  </Link>
                  ，包括服務說明、會員訂閱、禁止行為、知識產權和責任限制等條款。
                </label>
              </div>

              {/* 私隱政策 */}
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="privacy"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  我已閱讀並同意{" "}
                  <Link 
                    href="/privacy" 
                    className="text-amber-600 hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Shield className="w-3.5 h-3.5 inline mr-1" />
                    私隱政策
                  </Link>
                  ，了解本平台如何收集、使用和保護我的個人資料。
                </label>
              </div>
            </div>

            {/* 提示文字 */}
            <p className="text-xs text-gray-500 text-center">
              點擊「同意並登入」即表示您確認已年滿18歲或已獲得監護人同意
            </p>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            取消
          </Button>
          <Button
            onClick={handleLogin}
            disabled={!allAccepted}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white"
          >
            {allAccepted ? "同意並登入" : "請先勾選所有條款"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
