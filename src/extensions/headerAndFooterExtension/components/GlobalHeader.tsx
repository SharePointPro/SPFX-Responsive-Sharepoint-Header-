import * as React from 'react';
import styles from './globalHeader.module.scss';

export class GlobalHeader extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    private toggleExpand() {
        let leftNav = document.getElementById("spLeftNav");
        if (leftNav.classList.contains('showNav')){
            leftNav.classList.remove('showNav');
        } else{
            leftNav.classList.add('showNav');
        }
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.expandButtonWrapper}>
                <i 
                    data-icon-name="GlobalNavButton" 
                    onClick={() => this.toggleExpand()}
                    role="presentation" 
                    aria-hidden="true" 
                    className={`${styles.expandButton} ms-Icon root-33 css-98 ms-Button-icon icon-105`}
                    style={{ fontFamily: "FabricMDL2Icons;" }}></i>
            </div>
        );
    }
}