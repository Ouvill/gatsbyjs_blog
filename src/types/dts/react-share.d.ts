import "react-share"

declare module "react-share" {
  export const LineShareButton: React.StatelessComponent<
    CommonShareButtonProps & {
      title?: string
    }
  >

  export const LineIcon: React.StatelessComponent<IconComponentProps>

  export interface CommonShareButtonProps extends CommonShareButtonProps {
    className?: string
  }
}
