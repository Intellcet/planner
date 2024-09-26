import React from 'react';
import cn from 'clsx';

export enum PreserveAspectRatio {
  default,
  stretch,
  leftCenterCut,
}

const mappedPreserveAspectRatioToValue = {
  [PreserveAspectRatio.default]: 'xMidYMid meet',
  [PreserveAspectRatio.stretch]: 'none',
  [PreserveAspectRatio.leftCenterCut]: 'xMinYMid slice',
};

export type IconProps = {
  id: string;
  viewBox: string;
  preserveAspectRatio?: PreserveAspectRatio;
  className?: string;
  width?: number;
  height?: number;
};

const getSizeStyleAttribute = (
  sizeName: string,
  value?: number
): { [sizeName: string]: string } | null =>
  value ? { [sizeName]: `${value}px` } : null;

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, forwardRef): React.ReactElement => {
    const {
      id,
      viewBox,
      preserveAspectRatio = PreserveAspectRatio.default,
      className,
      width,
      height,
    } = props;

    return (
      <svg
        className={cn(className)}
        viewBox={viewBox}
        style={{
          ...getSizeStyleAttribute('width', width),
          ...getSizeStyleAttribute('height', height),
        }}
        ref={forwardRef}
        preserveAspectRatio={
          mappedPreserveAspectRatioToValue[preserveAspectRatio]
        }
      >
        <use xlinkHref={`#${id}`} />
      </svg>
    );
  }
);

export default Icon;
