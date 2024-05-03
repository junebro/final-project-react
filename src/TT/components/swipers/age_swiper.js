import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "./../../css/content_css.css";

// 나이 선택 스와이퍼
const Swiper_Age = () => {
  return (
    <>
      <Swiper
        className="age-swiper-container"
        modules={[EffectFade, Mousewheel]}
        // direction="vertical" // 진행 방향
        spaceBetween={1} // 슬라이드 간의 마진
        slidesPerView={1} // 한 슬라이드 당 보여줄 화면
        mousewheel={{
          enabled: true, // 마우스 휠 사용 가능
          sensitivity: 500, // 마우스 휠 민감도
        }}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>10</SwiperSlide>
        <SwiperSlide>11</SwiperSlide>
        <SwiperSlide>12</SwiperSlide>
        <SwiperSlide>13</SwiperSlide>
        <SwiperSlide>14</SwiperSlide>
        <SwiperSlide>15</SwiperSlide>
        <SwiperSlide>16</SwiperSlide>
        <SwiperSlide>17</SwiperSlide>
        <SwiperSlide>18</SwiperSlide>
        <SwiperSlide>19</SwiperSlide>
        <SwiperSlide>20</SwiperSlide>
        <SwiperSlide>21</SwiperSlide>
        <SwiperSlide>22</SwiperSlide>
        <SwiperSlide>23</SwiperSlide>
        <SwiperSlide>24</SwiperSlide>
        <SwiperSlide>25</SwiperSlide>
        <SwiperSlide>26</SwiperSlide>
        <SwiperSlide>27</SwiperSlide>
        <SwiperSlide>28</SwiperSlide>
        <SwiperSlide>29</SwiperSlide>
        <SwiperSlide>30</SwiperSlide>
        <SwiperSlide>31</SwiperSlide>
        <SwiperSlide>32</SwiperSlide>
        <SwiperSlide>33</SwiperSlide>
        <SwiperSlide>34</SwiperSlide>
        <SwiperSlide>35</SwiperSlide>
        <SwiperSlide>36</SwiperSlide>
        <SwiperSlide>37</SwiperSlide>
        <SwiperSlide>38</SwiperSlide>
        <SwiperSlide>39</SwiperSlide>
        <SwiperSlide>40</SwiperSlide>
        <SwiperSlide>41</SwiperSlide>
        <SwiperSlide>42</SwiperSlide>
        <SwiperSlide>43</SwiperSlide>
        <SwiperSlide>44</SwiperSlide>
        <SwiperSlide>45</SwiperSlide>
        <SwiperSlide>46</SwiperSlide>
        <SwiperSlide>47</SwiperSlide>
        <SwiperSlide>48</SwiperSlide>
        <SwiperSlide>49</SwiperSlide>
        <SwiperSlide>50</SwiperSlide>
        <SwiperSlide>51</SwiperSlide>
        <SwiperSlide>52</SwiperSlide>
        <SwiperSlide>53</SwiperSlide>
        <SwiperSlide>54</SwiperSlide>
        <SwiperSlide>55</SwiperSlide>
        <SwiperSlide>56</SwiperSlide>
        <SwiperSlide>57</SwiperSlide>
        <SwiperSlide>58</SwiperSlide>
        <SwiperSlide>59</SwiperSlide>
        <SwiperSlide>60</SwiperSlide>
        <SwiperSlide>61</SwiperSlide>
        <SwiperSlide>62</SwiperSlide>
        <SwiperSlide>63</SwiperSlide>
        <SwiperSlide>64</SwiperSlide>
        <SwiperSlide>65</SwiperSlide>
        <SwiperSlide>66</SwiperSlide>
        <SwiperSlide>67</SwiperSlide>
        <SwiperSlide>68</SwiperSlide>
        <SwiperSlide>69</SwiperSlide>
        <SwiperSlide>70</SwiperSlide>
        <SwiperSlide>71</SwiperSlide>
        <SwiperSlide>72</SwiperSlide>
        <SwiperSlide>73</SwiperSlide>
        <SwiperSlide>74</SwiperSlide>
        <SwiperSlide>75</SwiperSlide>
        <SwiperSlide>76</SwiperSlide>
        <SwiperSlide>77</SwiperSlide>
        <SwiperSlide>78</SwiperSlide>
        <SwiperSlide>79</SwiperSlide>
        <SwiperSlide>80</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Swiper_Age;
